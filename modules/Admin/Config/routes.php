<?php 

/** @var BlitzPHP\Router\RouteCollection $routes */

use BlitzPHP\Facades\Route;

Route::middleware(['session', 'force-reset'])->prefix('admin')->namespace('\App\Admin\Controllers')->group(static function() {
	Route::name('admin.home')->get('/', 'Home::index');

	Route::controller('ApprenantsController')->prefix('apprenants')->group(static function() {
		Route::name('admin.apprenants.formations')->get('/(:num)/formations', 'formations/$1');
	});
	Route::name('admin.apprenants')->presenter('apprenants');
	
	Route::controller('EnseignantsController')->prefix('enseignants')->group(static function() {
		Route::name('admin.enseignants.ressources')->get('/(:num)/ressources', 'ressources/$1');
		Route::post('/(:num)/ressources', 'addRessources/$1');
	});
	Route::name('admin.enseignants')->presenter('enseignants');
	
	Route::controller('RessourcesController')->prefix('ressources')->group(static function() {
		Route::name('admin.ressources.enseignants')->get('/(:num)/enseignants', 'enseignants/$1');
		Route::post('/(:num)/enseignants', 'addEnseignants/$1');
		Route::delete('/(:num)/enseignants', 'removeEnseignants/$1');
	});
	Route::name('admin.ressources')->presenter('ressources');

	Route::controller('LeconsController')->prefix('lecons')->group(static function() {
		Route::name('admin.lecons.formations')->get('/(:num)/formations', 'formations/$1');
	});
	Route::name('admin.lecons')->resource('lecons');

	Route::controller('FormationsController')->prefix('formations')->group(static function() {
		Route::name('admin.formations.lecons')->get('/(:num)/lecons', 'lecons/$1');
		Route::post('/(:num)/lecons', 'addLecons/$1');
		Route::patch('/(:num)/lecons', 'sortLecons/$1');
		Route::delete('/(:num)/lecons', 'removeLecons/$1');
	});
	Route::name('admin.formations')->resource('formations');

	Route::name('admin.parcours')->resource('parcours');
});
