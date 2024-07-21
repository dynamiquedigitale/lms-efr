<?php 

/** @var BlitzPHP\Router\RouteCollection $routes */

use BlitzPHP\Facades\Route;

Route::middleware(['session', 'force-reset'])->prefix('admin')->namespace('\App\Admin\Controllers')->group(static function() {
	Route::name('admin.home')->get('/', 'Home::index');

	Route::controller('ApprenantsController')->prefix('apprenants')->group(static function() {
		Route::name('admin.apprenants.formations')->get('/(:num)/formations', 'formations/$1');
	});
	Route::name('admin.apprenants')->presenter('apprenants');
	
	Route::name('admin.enseignants')->presenter('enseignants');
	
	Route::controller('RessourcesController')->prefix('ressources')->group(static function() {
		Route::name('admin.ressources.enseignants')->get('/(:num)/enseignants', 'enseignants/$1');
		Route::post('/(:num)/enseignants', 'addEnseignants/$1');
		Route::delete('/(:num)/enseignants', 'removeEnseignants/$1');
	});
	Route::name('admin.ressources')->presenter('ressources');
});
