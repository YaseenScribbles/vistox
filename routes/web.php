<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VisitController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return inertia('Welcome');
});

Route::middleware('guest')->group(function () {
    //Authentication
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware(['auth', 'auth.session'])->group(
    function () {
        //Authentication
        Route::post('/logout', [AuthController::class, 'logout']);

        //Dashboard
        Route::get('/dashboard', [DashboardController::class, 'show'])
            ->name('dashboard');

        //Users
        Route::resource('users', UserController::class);
        Route::post('/mail-password/{user}', [UserController::class, 'sendPassword']);

        //Contacts
        Route::resource('contacts', ContactController::class);

        //Orders
        Route::resource('orders', OrderController::class);

        //Visits
        Route::resource('visits', VisitController::class);
    }
);
