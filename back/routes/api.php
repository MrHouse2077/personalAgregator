<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\EventController;

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
    Route::post('/checkToken', [IndexController::class, 'checkToken']);
    Route::post('/getSearchResult', [IndexController::class, 'findUserAction']);
    Route::post('/register', [IndexController::class, 'registerUserAction']);
    Route::get('/logout', function () {    
    });

    Route::post('/addEvent', [EventController::class, 'addEventAction']);
    Route::post('/getEvents', [EventController::class, 'getEventsAction']);
    Route::post('/editEvent', [EventController::class, 'editEventAction']);
    Route::post('/deleteEvent', [EventController::class, 'deleteEventAction']);

    Route::middleware([TokenAuth::class])->post('/lk', function () {
        return "скрытая зона";
    });

});