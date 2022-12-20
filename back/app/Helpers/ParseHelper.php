<?php 
    namespace App\Helpers;



    class ParseHelper{
        static function parse($parseKey, $repeatData){
            $repeats = str_replace('"', '', $repeatData);
            $parsedRepeat = explode($parseKey, $repeats);
            return ['parsedInfo' => $parsedRepeat];
        }
        
       
        
    }