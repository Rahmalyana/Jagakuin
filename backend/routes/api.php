<?php

use Illuminate\Support\Facades\Route;

Route::get('/todos', function () {
    return response()->json([
        ['id' => 1, 'title' => 'Belajar React'],
        ['id' => 2, 'title' => 'Belajar Laravel']
    ]);
});