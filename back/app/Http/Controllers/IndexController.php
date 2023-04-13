<?php

namespace App\Http\Controllers;

use App\Helpers\RequestHelper;

use App\Http\Validators\FeedbackValidator;
use App\Http\Validators\LoginValidator;
use Illuminate\Validation\ValidationException;

use App\Models\User;
use App\Models\Event;
use App\Models\Friendship;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    function indexAction(Request $request){

        $validator = LoginValidator::loginCheck($request);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            if($request->lang == "ru"){
                return RequestHelper::write(402, 'В доступе отказано');
            }
            else if($request->lang == "en"){
                return RequestHelper::write(402, 'Entrance denied');
            }
            
        }

        $data = [
            "token" => $user->createToken("token_name")->plainTextToken,
            "name" => $user->name,
            "login" => $user->login,
            "email" => $user->email,
        ];

        

        return RequestHelper::write(200, 'sucess', $data);
    }

    function checkToken(Request $request){
        $token = \Laravel\Sanctum\PersonalAccessToken::findToken($request->token);
        if(!$token){
            return RequestHelper::write(402, 'Не токен');
        }
        $user = $token->tokenable;

        if(!$user){
            if($request->lang == "ru"){
                return RequestHelper::write(402, 'В доступе отказано');
            }
            else if($request->lang == "en"){
                return RequestHelper::write(402, 'Entrance denied');
            }
        }
        $data = [
            "login" => $user->login,
            "email" => $user->email,
        ];
        return RequestHelper::write(200, 'sucess', $data);
    }

    function feedbackAction(Request $request){
        
        $validator = FeedbackValidator::feedbackCheck($request);
        if ($validator->fails()) {
            return ['flag' => 0, 'msg' => 'error!'];
        }
        
        FeedbackJob::dispatch($request->name, $request->email, $request->msg);

        return ['flag' => 1, 'msg' => 'success!'];
    }
    
    function findUserAction(Request $request){
        $user = User::where('login', $request->login)->first();
        if($user==NULL){
            return RequestHelper::write(404, 'Пользователь не найден!', NULL);
        }
        
       
        $foundUser = User::find($user->id);
        $events = $foundUser->events;
        $filtered = [];
        $i=1;
        foreach ($events as $event){
            if($event->privacy_type_id != 3){
                $openEvent = array($i=>$event);
                $i = $i + 1;
                array_push($filtered, $openEvent);
            };
        }
        $data = [
            'events' => $filtered,
            'login' => $request->login,
        ];
        return RequestHelper::write(201, 'Пользователь найден успешно!', $data);
    }

    function registerUserAction(Request $request){

        $givenuser = User::where('email', $request->email)->first();
            if($givenuser!= null){
                return RequestHelper::write(409, 'По данному адресу уже существует аккаунт', null);
            }
        $givenuser = User::where('login', $request->login)->first();
            if($givenuser!= null){
                return RequestHelper::write(409, 'Данный логин занят, попробуйте другой', null);
            }
        
    
        $user = new User;

        $user->name = $request->name;
        $user->login = $request->login;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->privacy = 1;
        $user->role = 2;
        $user->save();
        $data = [
            "token" => $user->createToken("token_name")->plainTextToken,
            "login" => $user->login,
            "email" => $user->email,
        ]; 
        return RequestHelper::write(200, 'sucess', $data);
    }
    function getUserAction(Request $request){
        $user = User::where('login', $request->login)->first();    
        $data = [
            'name' => $user->name,
            'email' => $user->email,
            'privacy' => $user->privacy,
        ];
        return RequestHelper::write(201, 'success', $data);
    }
    function userSearchAction(Request $request){
        $users = User::all()->except($request->login);
        $data = [];
        foreach($users as $user){
            if(Str::startsWith($user->login, $request->search)){
                $user_data = [
                    'name' =>  $user->name,
                    'login' =>  $user->login,
                ];
                $data[] = $user_data;
            }
        }
        return RequestHelper::write(201, 'success', $data);
    }
    function addFriendAction(Request $request){
        $id1 = User::where('login', $request->myLogin)->first();
        $id2 = User::where('login', $request->login)->first();
        $data = [
            'friend_id1' => $id1->id,
            'friend_id2' => $id2->id,
        ];
        DB::table('friendships')->insert($data);
        $statement = true;
        if($request->lang == "ru"){
            return RequestHelper::write(200, 'Вы теперь друзья!', $statement);
        }
        else if($request->lang == "en"){
            return RequestHelper::write(200, 'You are friends now!', $statement);
        }
    }
    function checkFriendshipAction(Request $request){
        $id1 = User::where('login', $request->myLogin)->first();
        $id2 = User::where('login', $request->login)->first();
        $status1 = DB::table('friendships')->where([
            ['friend_id1', '=', $id1->id],
            ['friend_id2', '=', $id2->id],
        ])->first();
        $status2 = DB::table('friendships')->where([
            ['friend_id1', '=', $id2->id],
            ['friend_id2', '=', $id1->id],
        ])->first();
        if($status1==null && $status2==null){
            $statement = false;
            return RequestHelper::write(200, 'Не друзья', $statement);
        }
        else{
            $statement = true;
        return RequestHelper::write(200, 'Друзья!', $statement);
        }
        
    }
    function deleteFriendshipAction(Request $request){
        $id1 = User::where('login', $request->myLogin)->first();
        $id2 = User::where('login', $request->login)->first();
        $status1 = DB::table('friendships')->where([
            ['friend_id1', '=', $id1->id],
            ['friend_id2', '=', $id2->id],
        ])->first();
        $id;
        if($status1==null){
            $status2 = DB::table('friendships')->where([
                ['friend_id1', '=', $id2->id],
                ['friend_id2', '=', $id1->id],
            ])->first();
            $id = $status2->id;
        }else
        {
            $id = $status1->id;
        }
        DB::table('friendships')->where('id', $id)->delete();
        $statement = false;
        if($request->lang == "ru"){
            return RequestHelper::write(200, 'Вы больше не друзья', $statement);
        }
        else{
            return RequestHelper::write(200, 'You are not friends anymore!', $statement);
        }
        
        
    }
    function updateUserAction(Request $request){
        $data = json_decode($request->data);
        $user = User::where('login', $request->login)->first();
        if($data->field=="name"){
           
            $user->name = $data->text;
            $user->save();
            $editedUser =[
                "login" => $request->login,
                "name" => $user->name,
                "email" => $user->email,
            ];
            return RequestHelper::write(200, 'Успешно изменено!', $editedUser);
        }
        else if($data->field=="email"){
            $users = User::where('email', $data->text)->get();
        
            if(count($users) > 0){
                return RequestHelper::write(500, 'Почта занята!', NULL);
            }

            $user->email = $data->text;
            $user->save();
            $editedUser =[
                "login" => $user->login,
                "name" => $user->name,
                "email" => $user->email,
            ];
            return RequestHelper::write(200, 'Успешно изменено!', $editedUser);
        }
        //     if($givenuser!= null){
        //         return RequestHelper::write(409, 'По данному адресу уже существует аккаунт', null);
        //     }
        // $givenuser = User::where('login', $request->login)->first();
        //     if($givenuser!= null){
        //         return RequestHelper::write(409, 'Данный логин занят, попробуйте другой', null);
        //     }
        
    
        // $user = new User;

        // $user->name = $request->name;
        // $user->login = $request->login;
        // $user->email = $request->email;
        // $user->password = Hash::make($request->password);
        // $user->privacy = 1;
        // $user->role = 2;
        // $user->save();
        // $data = [
        //     "token" => $user->createToken("token_name")->plainTextToken,
        //     "login" => $user->login,
        //     "email" => $user->email,
        // ]; 
        // return RequestHelper::write(200, 'sucess', $data);
    }
}