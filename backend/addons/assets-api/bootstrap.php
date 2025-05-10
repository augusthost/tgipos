<?php

/**
 * Assets API
 */
$this->on('restApi.config', function ($restApi) {


    $restApi->addEndPoint('/assets/upload', [

        'POST' => function ($params, $app) {

            $meta = ['folder' => $this->param('folder', '')];

            return $this->module('assets')->upload('files', $meta);
        }
    ]);

    $restApi->addEndPoint('/assets/remove', [

        'POST' => function ($params, $app) {

            if ($assets = $this->param('assets', false)) {
                return $this->module('assets')->remove($assets);
            }

            return false;
        }
    ]);

});
