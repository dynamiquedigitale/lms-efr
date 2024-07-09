<?php 

/** @var BlitzPHP\Router\RouteCollection $routes */

use BlitzPHP\Facades\Route;

auth()->routes($routes);
Route::name('reset-password')->form('reset-password', 'Home::resetPassword');

Route::middleware(['session', 'force-reset'])->group(function () {
    Route::name('home')->get('/', 'Home::index');

	Route::prefix('/admin')->namespace('\App\Controllers\Admin')->group(function () {
		Route::name('admin.home')->get('/', 'Home::index');
	});
});
