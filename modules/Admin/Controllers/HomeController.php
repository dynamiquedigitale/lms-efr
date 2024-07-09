<?php namespace App\Admin\Controllers;

use App\Controllers\AppController;

class HomeController extends AppController
{
	public function index()
	{
		return inertia('Home');
	}
}
