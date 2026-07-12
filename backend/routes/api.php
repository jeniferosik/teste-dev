<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CharacterController;

Route::get('/characters', [CharacterController::class, 'index']);

Route::get('/characters/{api_id}', [CharacterController::class, 'show']);




           