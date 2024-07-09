<?php 

/** @var BlitzPHP\Router\RouteCollection $routes */

use BlitzPHP\Facades\Route;

auth()->routes($routes);
Route::name('reset-password')->form('reset-password', 'HomeController::resetPassword');
Route::get('file/(:any)', static fn ($path) => service('container')->call(App\Controllers\FileViewerController::class, [$path]));

Route::middleware(['session', 'force-reset'])->group(function () {
    Route::name('home')->get('/', 'Home::index');
});
