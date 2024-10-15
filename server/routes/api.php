<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InPoUserController;

Route::post("/login", [InPoUserController::class, "login"]);
Route::post("/logout", [InPoUserController::class, "logout"]);
Route::post("/register", [InPoUserController::class, "register"]);



Route::middleware('auth')->group(function () {
    Route::post('/ip/destroy', [IPHistoryController::class, 'destroyMultiple']);
    Route::post('/ip/store', [IPHistoryController::class, 'store']);
    Route::get('/ip/{id}', [IPHistoryController::class, 'show']);

});

