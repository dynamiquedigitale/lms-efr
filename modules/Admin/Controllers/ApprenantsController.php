<?php

namespace App\Admin\Controllers;

use App\Controllers\AppController;

class ApprenantsController extends AppController
{
	public function index()
	{
		return inertia('Admin/Apprenants/Index');
	}
}
