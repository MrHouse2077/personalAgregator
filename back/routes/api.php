<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {

    Route::post('/login', [IndexController::class, 'indexAction']);
    Route::post('/chekToken', [IndexController::class, 'checkToken']);
    Route::get('/get-users', function(){
        return User::get();
    });

    Route::get('/logout', function () {    
    });

    Route::middleware([TokenAuth::class])->post('/lk', function () {
        return "скрытая зона";
    });

});