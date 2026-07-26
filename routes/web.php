<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskPhotoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('splash');
})->name('splash');

Route::resource('tasks', TaskController::class);

Route::post('tasks/{task}/photos', [TaskPhotoController::class, 'store'])
    ->name('tasks.photos.store');

Route::delete('tasks/{task}/photos/{photo}', [TaskPhotoController::class, 'destroy'])
    ->name('tasks.photos.destroy');
