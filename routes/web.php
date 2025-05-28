<?php

use App\Http\Controllers\ExampleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/**
 * |--------------------------------------------------------------------------
 * | Web Routes
 * |--------------------------------------------------------------------------
 * @see https://laravel.com/docs/12.x/routing
 */

Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

Route::resource('examples', ExampleController::class)->middleware(['auth']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
