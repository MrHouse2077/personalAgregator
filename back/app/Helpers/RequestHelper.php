<?php 
    namespace App\Helpers;

    // const NO_AUTH = 401;
    // const ACCESS_DENIED = 402;
    // const NO_PERMISSION = 403;
    // const SUCCESS = 200;

    class RequestHelper{
        static function write($code, $msg, $data = null){

            return ['code' => $code, 'msg' => $msg, 'data' => $data];
        }
    }