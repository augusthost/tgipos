<?php

namespace System\Helper;

use ArrayObject, DirectoryIterator;

class Spaces extends \Lime\Helper {

    protected array $instances = [];
    protected bool $isMaster;
    protected $master = null;

    protected function initialize() {
        $this->isMaster = $this->app->path('#app:') === $this->app->path('#root:');
    }

    public function isMaster() {
        return $this->isMaster;
    }

    public function isSpace() {
        return !$this->isMaster;
    }

    public function spaces() {

        $folder = APP_SPACES_DIR;
        $spaces = [];

        if ($folder && file_exists($folder)) {

            $dir = new DirectoryIterator($folder);
            $rootUrl = rtrim($this->app->routeUrl('/'), '/');

            foreach ($dir as $f) {

                if (!$f->isDir() || $f->isDot()) continue;

                $name = $f->getFilename();
                $group = null;

                if (file_exists($folder."/{$name}/config/config.php")) {
                    $cfg = include($folder."/{$name}/config/config.php");
                    $group = $cfg['@space']['group'] ?? null;
                }

                $spaces[] = [
                    'name' => $name,
                    'url' => "{$rootUrl}/:{$name}",
                    'group' => $group
                ];
            }
        }

        return $spaces;
    }

    public function master() {

        if ($this->isMaster) {
            return $this->app;
        }

        if (!$this->master) {
            $this->master = \Cockpit::instance();
        }

        return $this->master;
    }

    public function space(string $name) {

        if (isset($this->instances[$name])) {
            return $this->instances[$name];
        }

        $dir = APP_SPACES_DIR."/{$name}";

        if (!file_exists($dir)) {
            return null;
        }

        $this->instances[$name] = \Cockpit::instance($dir, [
            'app_space' => $name,
        ]);

        return $this->instances[$name];
    }

    public function create(string $name, array $options = []) {

        $options = array_merge([
            'group' => null,
            'user' => 'admin',
            'password' => 'admin',
            'email' => 'admin@admin.com',
            'datastorage' => [
                'type' => 'mongolite',
                'server' => '',
                'database' => ''
            ]
        ], $options);

        $fs = $this->app->helper('fs');
        $name = $this->app->helper('utils')->sluggify(trim($name));
        $path = APP_SPACES_DIR."/{$name}";

        // Space
        $spaceConfig = new ArrayObject([
            '@space' => [
                'group' => $options['group'],
            ]
        ]);

        if (file_exists($path)) {
            return false;
        }

        if ($options['datastorage']['type'] == 'mongodb') {

            if (
                !isset($options['datastorage']['server']) ||
                !isset($options['datastorage']['database']) ||
                !$options['datastorage']['server'] ||
                !$options['datastorage']['database']
            ) {
                return false;
            }

            $spaceConfig['database'] = [
                'server' => $options['datastorage']['server'],
                'options' => ['db' => $options['datastorage']['database']],
                'driverOptions' => []
            ];
        }

        // create env folders
        $fs->mkdir("{$path}/config");
        $fs->mkdir("{$path}/storage/cache");
        $fs->mkdir("{$path}/storage/data");
        $fs->mkdir("{$path}/storage/tmp");
        $fs->mkdir("{$path}/storage/uploads");

        $this->app->trigger('spaces.config.create', [$spaceConfig]);

        $export = $this->app->helper('utils')->var_export($spaceConfig->getArrayCopy(), true);

        // space config file
        $fs->write("{$path}/config/config.php", "<?php\n\nreturn {$export};");

        $created = time();
        $instance = \Cockpit::instance($path);

        $user = [
            'active' => true,
            'user' => $options['user'],
            'name' => 'Admin',
            'email' => $options['email'],
            'password' => $instance->hash($options['password']),
            'i18n' => 'en',
            'role' => 'admin',
            'theme' => 'auto',
            '_modified' => $created,
            '_created' => $created
        ];

        $instance->dataStorage->save('system/users', $user);
        $instance->trigger('app.system.install');

        $this->app->trigger('spaces.spaces.created', [$name, $spaceConfig]);

        return [
            'name' => $name,
            'url' => rtrim($this->app->routeUrl('/'), '/')."/:{$name}"
        ];
    }

    public function remove(string $name) {

            $path = APP_SPACES_DIR."/{$name}";

            if (!file_exists($path)) {
                return false;
            }

            $folder = $this->app->path($path);

            if ($folder) {

                $this->app->trigger('spaces.remove', [$name]);
                $this->app->helper('fs')->delete($folder);

                return true;
            }

            return false;
    }
}
