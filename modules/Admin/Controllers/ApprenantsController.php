<?php

namespace App\Admin\Controllers;

use App\Controllers\AppController;
use App\Models\UserModel;
use BlitzPHP\Wolke\Pagination\LengthAwarePaginator;

class ApprenantsController extends AppController
{
	public function index()
	{
		['items' => $items, 'total' => $total] = model(UserModel::class)->searchApprenants(
			[
				'nom'       => $this->request->string('search'),
				'prenom'    => $this->request->string('search'),
				'matricule' => $this->request->string('search'),
			],
			$currentPage = $this->request->integer('page'),
			$perPage = $this->request->integer('limit', 15),
			$this->request->string('sortColumn', 'created_at'),
			$this->request->string('sortDirection', 'desc'),
		);

		$paginator = new LengthAwarePaginator($items, $total, $perPage, $currentPage);
		
		$data['apprenants'] = $paginator->toArray();

		return inertia('Admin/Apprenants/Index', $data);
	}
}
