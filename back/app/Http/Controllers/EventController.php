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
        $event->users()->attach($user);
        $id = $event->id;
        if(property_exists($dataSent, 'moderators')){
            if(in_array(0, $dataSent->moderators)){
                $event->users()->syncWithoutDetaching([0]);
            }
            else{
                $event->users()->syncWithoutDetaching($dataSent->moderators);
            }
        }
        if(property_exists($dataSent, 'readers')){
            if(in_array(0, $dataSent->readers)){
                $user = DB::table('event_user')->where([
                    ['user_id', '=', 0],
                    ['event_id', '=', $id],
                ])->first();
                if($user==null){
                    $readers = [
                        0 => ["rights" => 2],
                    ];

                    $event->users()->syncWithoutDetaching($readers);
                }  
            }
            else{
                foreach($dataSent->readers as $reader){
                    $user = DB::table('event_user')->where([
                        ['user_id', '=', $reader],
                        ['event_id', '=', $id],   
                    ])->first();
                    if($user==null){
                        
                        $readers = [
                            $reader => ["rights" => 2],
                        ];
                        $event->users()->syncWithoutDetaching($readers);
                    }
                }
                
            }
        }
        
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
        $id1 = User::where('login', $request->login)->first();
        $id2 = User::where('login', $request->viewer)->first();
        $friends1 = DB::table('friendships')->where([
            ['friend_id1', '=', $id1->id],
        ])->get();
        $friends2 = DB::table('friendships')->where([
            ['friend_id2', '=', $id1->id],
        ])->get();
        $friendshipFlag;
        $all = $friends1->merge($friends2);
        $list = [];
        foreach($all as $relation){
            if($relation->friend_id1 == $id1->id){
                $usr = User::where('id', $relation->friend_id2)->first();
                $tmp = [
                    "id" => $usr->id,
                    "name" => $usr->name,
                    "email" => $usr->email,
                    "login" => $usr->login,
                ];
                array_push($list, $tmp);
            }
            else{
                $usr = User::where('id', $relation->friend_id1)->first();
                $tmp = [
                    "id" => $usr->id,
                    "name" => $usr->name,
                    "email" => $usr->email,
                    "login" => $usr->login,
                ];
                array_push($list, $tmp);
            }
        }

        if(count($list)==0){
            $friendshipFlag = false;
        }else{
            $friendshipFlag = true;
        }
        foreach ($events as $event){
             // if((events[i].moderators != undefined &&
            // (events[i].moderators.includes(myId) || events[i].moderators.includes(0))) || 
            //   (events[i].readers != undefined &&
            //     (events[i].readers.includes(myId) || events[i].readers.includes(0))))
            
            // Заметка на случай если усну: проверка на то, есть ли 
            // у смотрящего пользователя доступ к ивенту. Если ни в
            // модераторах, ни в читателях его айдишника нет, то
            // данный ивент даже не запоминается
            
            $canView = DB::table('event_user')
                ->where([
                ['user_id', '=', $id2->id],
                ['event_id', '=', $event->id]])
                ->orWhere([
                    ['user_id', '=', 0],
                    ['event_id', '=', $event->id]])->first();

            
            if($request->login == $request->viewer || isset($canView)){
                
            
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
            $ids = DB::table('event_user')->where([
                ['event_id', '=', $event->id],   
            ])->get();
            $moderators =[];
            $readers =[];
            foreach($ids as $user){
                if($user->rights == 4 && $user->user_id != $id1->id){
                    array_push($moderators, $user->user_id);
                }
                elseif($user->rights == 2){
                    array_push($readers, $user->user_id);
                }
            }
           
            if(!empty($readers)){
                $temp['readers'] = $readers;
            }
            if(!empty($moderators)){
                $temp['moderators'] = $moderators;
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
        else{
           continue;
        }

        }
        
        if($data==null && $friendshipFlag==false){
            return RequestHelper::write(201, 'no events', null);
        }
        $dataJSON = json_encode($data);
        $listJSON = json_encode($list);
        $data[0] = $dataJSON;
        if($friendshipFlag==true){
            
            
            $data[1] = $listJSON;
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
        if(isset($dataSent->moderators) && !empty($dataSent->moderators)){

            if(in_array(0, $dataSent->moderators)){
                $event->users()->sync([$user->id]);
                $event->users()->syncWithoutDetaching([0]);
            }
            else{
                $event->users()->sync($dataSent->moderators);
                $event->users()->syncWithoutDetaching([$user->id]);
            }
        }
        else{
            $event->users()->sync([$user->id]);
        }
        if(isset($dataSent->readers) && !empty($dataSent->readers)){
            
            if(in_array(0, $dataSent->readers)){
            $usr = DB::table('event_user')->where([
                ['user_id', '=', 0],
                ['event_id', '=', $event->id],
                ['rights', '=', 4],
            ])->first();
            if($usr==null){
                $readers = [
                    0 => ["rights" => 2],
                    $user->id => ["rights" => 4]
                ];
                $event->users()->sync($readers);
            }  
        }
        else{
            $readers = [];
            foreach($dataSent->readers as $reader){
                $usr = DB::table('event_user')->where([
                    ['user_id', '=', $reader],
                    ['event_id', '=',  $event->id],   
                ])->first();
                if($usr==null){
                    
                    $readers = [
                        $reader => ["rights" => 2],
                    ];
                 
                    $event->users()->syncWithoutDetaching($readers);

                }
            }
            $readers[] = $user->id;
            foreach($dataSent->moderators as $mod){
                $readers[] = $mod;
            }
            $event->users()->syncWithoutDetaching($readers);
            
        }
        }
        else{
            $event->users()->syncWithoutDetaching([$user->id]);
        }
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