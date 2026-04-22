<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\ChatController;
use App\Http\Controllers\API\DealController;
use App\Http\Controllers\API\ReviewController;
use App\Http\Controllers\API\AuthController;

Route::get('/todos', function () {
    return response()->json([
        ['id' => 1, 'title' => 'Belajar React'],
        ['id' => 2, 'title' => 'Belajar Laravel']
    ]);
});

Route::apiResource('posts', PostController::class);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/chats', [ChatController::class, 'index']);
Route::post('/chat/send', [ChatController::class, 'send']);

Route::get('/deals', [DealController::class, 'index']);
Route::post('/deal/agree', [DealController::class, 'agree']);

Route::get('/reviews', [ReviewController::class, 'index']);
Route::post('/review', [ReviewController::class, 'store']);


