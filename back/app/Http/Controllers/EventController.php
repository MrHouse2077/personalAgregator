<?php

namespace App\Http\Controllers;

use App\Helpers\RequestHelper;
use App\Helpers\ParseHelper;
use App\Helpers\RepeatHelper;

use App\Http\Validators\FeedbackValidator;
use App\Http\Validators\LoginValidator;
use Illuminate\Validation\ValidationException;

use App\Models\User;
use App\Models\Event;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class EventController extends Controller
{
    function addEventAction(Request $request){
        $user =  User::where('login', $request->login)->first();
        $dataSent = json_decode($request->event);
        $event = new Event;
        if(isset($dataSent->text) && $dataSent->text!=""){
            $event->name = $dataSent->text;
        }
        if(isset($dataSent->description)){
            $event->description = $dataSent->description;
        }
        $event->privacy_type_id = $user->privacy;
        $event->repeat_type_id = 1;
        $event->start_time = $dataSent->startDate;
        $event->end_time = $dataSent->endDate;
        $event->creator = $request->login;
        $event->save();
        // $event->users()->attach($user);
        $id = $event->id;
        if(isset($dataSent->recurrenceRule) && $dataSent->recurrenceRule!=""){
            $parsedRules = ParseHelper::parse(';', $dataSent->recurrenceRule);
            $rulesArr = [];
            foreach($parsedRules['parsedInfo'] as $rule){
                $tmp = explode("=", $rule);
                $rulesArr[$tmp[0]]=$tmp[1];
               
            }
            $repeat = RepeatHelper::createRules($rulesArr);
            $event->repeat_type_id = $repeat['type']; 
            $event->save(); 
            $data = [];
            $data['event_id'] = $id;
            foreach($repeat['rules'] as $row=>$rule){
                $data[$row]=$rule;
               
            }
            DB::table('event_repeats')->insert($data);
            
        }
        $dataSent->{"id"} = $id;
       
        return RequestHelper::write(200, 'sucess', $dataSent);
    }
    
    function getEventsAction(Request $request){
        $events =  Event::where('creator', $request->login)->get();
        $data = [];
        foreach ($events as $event){
            $temp =[
                'id'=>$event->id,
                'text'=> $event->name,
                'startDate' => $event->start_time,
                'endDate' => $event->end_time,
                // $event->repeat_type_id = 1;
                //  = $dataSent->startDate;
            ];
            if(isset($event->name)){
                $temp['name'] = $event->name;
            }
            if(isset($event->description)){
                $temp['description'] = $event->description;
            }
            if(isset($event->repeat_type_id)){
                $rules = DB::table('event_repeats')->where('event_id', $event->id)->first();
               // $temp['recurrenceRule'] = $event->name;
                $repeatRules = "";
                switch($event->repeat_type_id){
                    case 2:
                        $repeatRules=$repeatRules."FREQ=DAILY;";
                        break;
                    case 3:
                        $repeatRules=$repeatRules."FREQ=WEEKLY;";
                        $repeatRules=$repeatRules."BYDAY=".$rules->repeat_on_week_day.";";
                        break;
                    case 4:
                        $repeatRules=$repeatRules."FREQ=MONTHLY;";
                        $repeatRules=$repeatRules."BYMONTHDAY=".$rules->repeat_on_day.";";
                        break;
                    case 5:
                        $repeatRules=$repeatRules."FREQ=YEARLY;";
                        $repeatRules=$repeatRules."BYMONTH=".$rules->repeat_on_month.";";
                        $repeatRules=$repeatRules."BYMONTHDAY=".$rules->repeat_on_day.";";
                        break;
                    default:
                        $repeatRules=null;
                    break;
                }
                if(isset($rules->period)){
                    $repeatRules=$repeatRules."INTERVAL=".$rules->period.";";
                   }
                if(isset($rules->amount)){
                    $repeatRules=$repeatRules."COUNT=".$rules->amount.";";
                }
                if(isset($rules->end_date)){
                    $repeatRules=$repeatRules."UNTIL=".$rules->end_date.";";
                } 
                $repeatRules = rtrim($repeatRules, ";");
                $temp['recurrenceRule'] = $repeatRules;
            }
            
            $data[] = $temp;

        }
        
        return RequestHelper::write(200, 'sucess', $data);
    }
    function editEventAction(Request $request){
        $user =  User::where('login', $request->login)->first();
        $dataSent = json_decode($request->event);
        $event = Event::where('id', $dataSent->id)->first();
        if(isset($dataSent->text) && $dataSent->text!=""){
            $event->name = $dataSent->text;
        }
        else{
            $event->name = "";
        }
        if(!isset($dataSent->description) || $dataSent->description==""){
            $event->description = "";
        }
        else{
            $event->description = $dataSent->description;
        }
        
        $event->privacy_type_id = $user->privacy;
        $event->repeat_type_id = 1;
        $event->start_time = $dataSent->startDate;
        $event->end_time = $dataSent->endDate;
        $event->creator = $request->login;
        $event->save();
        if(isset($dataSent->recurrenceRule) && $dataSent->recurrenceRule!=""){
            $parsedRules = ParseHelper::parse(';', $dataSent->recurrenceRule);
            $rulesArr = [];
            foreach($parsedRules['parsedInfo'] as $rule){
                $tmp = explode("=", $rule);
                $rulesArr[$tmp[0]]=$tmp[1];
               
            }
            $repeat = RepeatHelper::createRules($rulesArr);
            $event->repeat_type_id = $repeat['type']; 
            $event->save(); 
            $data = [];
            $data['event_id'] = $id;
            foreach($repeat['rules'] as $row=>$rule){
                $data[$row]=$rule;
               
            }
            DB::table('event_repeats')->insert($data);
            
        }


        return RequestHelper::write(200, 'sucess', $event);
    }

    function deleteEventAction(Request $request){
        $event = Event::where('id', $request->data)->first();
        DB::table('event_repeats')->where('event_id', $request->data)->delete();
        DB::table('event_user')->where('event_id', $request->data)->delete();
        $event->delete();
       

        return RequestHelper::write(200, 'sucess');
    }

}