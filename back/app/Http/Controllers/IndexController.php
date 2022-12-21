<?php

namespace App\Http\Controllers;

use App\Helpers\RequestHelper;

use App\Http\Validators\FeedbackValidator;
use App\Http\Validators\LoginValidator;
use Illuminate\Validation\ValidationException;

use App\Models\User;
use App\Models\Event;

use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;

class IndexController extends Controller
{
    function indexAction(Request $request){

        $validator = LoginValidator::loginCheck($request);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return RequestHelper::write(402, 'В доступе отказано');
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
            return RequestHelper::write(402, 'В доступе отказано');
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