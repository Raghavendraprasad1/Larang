<?php

use App\Http\Controllers\DynamicListController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/test', function(){
//     return view('hello');
// });

Route::view('admin', 'hello');

// Route::get('path', 'controller file');
// Route::get('user', [UsersController::class, 'show']);
// Route::get('student', [UsersController::class, 'getData']);
// Route::post('addstudent', [UsersController::class, 'addData']);
// Route::delete('deleteStudent/{id}', [UsersController::class, 'deleteData']);
Route::get('sendmail', [UsersController::class, 'basic_email']);

// // route to get records to edit
// Route::get('getOneStudent/{id}', [UsersController::class, 'getOneData']);
// // route to update, modifies record
// Route::patch('updateStudent/{id}', [UsersController::class, 'updateData']);

// routes for Dynamiclist controller:
Route::get('dynamiclist', [DynamicListController::class, 'dynaliclist']);
Route::post('getlist', [DynamicListController::class, 'getlist']);