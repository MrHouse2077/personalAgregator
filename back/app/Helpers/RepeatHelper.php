<?php 
    namespace App\Helpers;



    class RepeatHelper{
        static function createRules($rules){
            $data = [];
            $data['rules'] = [];
            switch($rules["FREQ"]){
                case "DAILY":
                    $data['type'] = 2;
                    break;
                case "WEEKLY":
                    $data['type'] = 3;
                    $data['rules']['repeat_on_week_day'] = $rules["BYDAY"];
                    break;
                case "MONTHLY":
                    $data['type'] = 4;
                    $data['rules']['repeat_on_day'] = $rules["BYMONTHDAY"];
                    break;
                case "YEARLY":
                    $data['type'] = 5;
                    $data['rules']['repeat_on_month'] = $rules["BYMONTH"];
                    $data['rules']['repeat_on_day'] = $rules["BYMONTHDAY"];
                    break;
                default:
                $data['type'] = 1;
                break;
            }
            if(isset($rules["INTERVAL"])){
                $data['rules']['period']=$rules["INTERVAL"];
            }
            if(isset($rules["COUNT"])){
                $data['rules']['amount']=$rules["COUNT"];
            }
            if(isset($rules["UNTIL"])){
                $data['rules']['end_date']=$rules["UNTIL"];  
            } 
            return $data;
        }   
    }