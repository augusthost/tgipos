<?php


// Login
$this->bind('/api/auth/login', function () {

    $user     = $this->param('username');
    $password = $this->param('password');

    if (!$user || !$password) {
        return $this->stop(['error' => 'User and password are required'], 412);
    }

    $user = $this->helper('auth')->authenticate(compact('user', 'password'));

    if (!$user) {
        error_log('Login failed: Invalid username or password.');
        return $this->stop(['error' => 'Invalid username or password. Please try again.'], 401);
    }

    if(!isset($user['apiKey'])){
        return json_encode(['status' => 402, 'message' => 'It seems user doesn\'t have API key yet.', 'data' => ['apiKey' => '']]);
    }
    
    return json_encode(['status' => 200, 'message' => 'Successfully logged in!', 'data' => [ 'user' => [
        'username' => $user['user'],
        'name' => $user['name'],
        'email' => $user['email'],
        'role' => $user['role'],
        'apiKey' => $user['apiKey']
    ]]]);

});





// Register

/**
 * Sending Email
 *
 * @param array $data
 * @return void
 */
function sendingEmail($data, $that)
{
    $base_64_string = base64_encode($data['_id']."_".$data['confirmation_token']);
    $generateLink = $that->site_url.'/api/register/confirm?ct='.$base_64_string;
    $to    = $data['email'];
    $title = "Account confirmation";

    $body = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml"> <head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/> <meta content="width=device-width" name="viewport"/> <meta content="IE=edge" http-equiv="X-UA-Compatible"/> <title></title> <style>.center-box{margin:40px auto; box-shadow:0 1px 10px #ddd; border-radius:4px; max-width:500px; padding:20px; background:#fff;}</style> </head> <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #f6f7f9;"> <div class="center-box">';
    $body .= 'Hi '.$data["name"].',<br><br>';
    $body .= '&nbsp;&nbsp;&nbsp;&nbsp;Let’s confirm your email address, <br> Click below to confirm your email address and agree to our Terms of Service. <br><br>';
    $body .= '<a href="'.$generateLink.'" style="text-decoration:none;box-shadow:0 1px 10px #eee;padding:4px 10px;border-radius:30px;background:#007bff;color:#fff;">';
    $body .= 'Confirm My Email Address</a>';
    $body .= '<br><br> Best Regards,<br>';
    $body .= 'Cockpit CMS'.'<br>';

    $body .= '</div></body></html>';

    try {
        $response = $that->mailer->mail($to, $title, $body);
    } catch (\Exception $e) {
        $response = $e->getMessage();
    }
}

/**
 * Register a new user
 *
 * @return user $user
 */
function registerUser($that)
{
    $data = $that->param('user', false);
    // $user = $that->module('cockpit')->getUser();
    // return $user;
    if (!$data) {
        return $that->stop(['error' => 'Missing user data'], 412);
    }

    // new user needs a password
    if (!isset($data['_id'])) {
        // new user needs a password
        if (!isset($data['password'])) {
            return $that->stop(['error' => 'User password required'], 412);
        }

        // new user needs a username
        if (!isset($data['email']) || !trim($data['email'])) {
            return $that->stop(['error' => 'Email is required'], 412);
        }

        $confirmation_token = substr(md5(rand()), 0, 32);
        
        // Every new user will be user role
        $data['role']      = 'appuser';
        $data['_created']  = time();
        $data['_modified'] = time();
        
        $data = \array_merge($account = [
        'user'   => explode('@', $data['email'])[0],
        'name'   => '',
        'email'  => '',
        'active' => false,
        'confirmation_token' => $confirmation_token,
        'i18n'   => 'en',
        'role'   => 'user',
        'theme'  => 'auto'
    ], $data);

        if (!isset($data['api_key'])) {
            $data['apiKey'] = 'USR-'.\bin2hex(random_bytes(20));
        }

    }

    if (isset($data['password'])) {
        if (strlen($data['password'])) {
            $data['password'] = $that->hash($data['password']);
        } else {
            unset($data['password']);
        }
    }

    if (isset($data['email']) && !$that->helper('utils')->isEmail($data['email'])) {
        return $that->stop(['error' => 'Valid email required'], 412);
    }

    if (isset($data['user']) && !\trim($data['user'])) {
        return $that->stop(['error' => 'Username cannot be empty!'], 412);
    }

    foreach (['name', 'user', 'email'] as $key) {
        if (isset($data[$key])) {
            $data[$key] = \strip_tags(\trim($data[$key]));
        }
    }

    // unique check
    // --
    if (isset($data['user'])) {
        $_account = $that->dataStorage->findOne('system/users', ['user'  => $data['user']]);

        if ($_account && (!isset($data['_id']) || $data['_id'] != $_account['_id'])) {
            $that->stop(['error' =>  'Username is already used!'], 412);
        }
    }

    if (isset($data['email'])) {
        $_account = $that->dataStorage->findOne('system/users', ['email'  => $data['email']]);

        if ($_account && (!isset($data['_id']) || $data['_id'] != $_account['_id'])) {
            $that->stop(['error' =>  'Email is already used!'], 412);
        }
    }
    // --


    $that->trigger('cockpit.accounts.save', [&$data, isset($data['_id'])]);
    $that->dataStorage->save('system/users', $data);

    // sendingEmail($data,$that);

    if (isset($data['password'])) {
        unset($data['password']);
        unset($data['apiKey']);
        unset($data['confirmation_token']);
    }

    return $data;
}


/**
 * Email Confirmation
 *
 * @return mixed
 */
function emailConfirmation($that)
{
    $encoded = $that->param('ct', false);
    if (empty($encoded)) {
        return;
    }
    $decoded = explode("_", base64_decode($encoded));
    $id      = $decoded[0];
    $account = $that->dataStorage->findOne('system/users', ['_id' => $id]);

    if ($account['confirmation_token'] !== $decoded[1]) {
        return json_encode([
            'status' => 401,
            'message' => 'Your email confirmation code is expired or incorrect.'
        ]);
    };

    $account['active']             = true;
    $account['confirmation_token'] = 'confirmed';

    $that->dataStorage->save('system/users', $account);

    return json_encode([
        'status' => 200,
        'message' => 'Your email was confirmed!'
    ]);
}


/**
 * Cockpit sample addon
 *
 * @author  Raruto
 * @package cockpit-blog
 * @license MIT
 *
 * @source https://github.com/Raruto/cockpit-sample-addon
 */

// Test page (REST API)
$this->bind('/api/auth/register', function () {
    $respone = registerUser($this);

    return json_encode(['status' => 200, 'data' => $respone]);
});



// Test page (REST API)
$this->bind('/api/register/confirm', function () {
    $respone = emailConfirmation($this);

    return json_encode(['status' => 200, 'data' => $respone]);
});