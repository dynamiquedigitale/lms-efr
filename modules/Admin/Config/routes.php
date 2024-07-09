<?php 

/** @var BlitzPHP\Router\RouteCollection $routes */

use BlitzPHP\Facades\Route;

Route::middleware(['session', 'force-reset'])->prefix('admin')->namespace('\App\Admin\Controllers')->group(static function() {
	Route::name('admin.home')->get('/', 'Home::index');
	Route::name('admin.apprenants')->presenter('apprenants');	
});
