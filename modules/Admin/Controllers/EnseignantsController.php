<?php

namespace App\Admin\Controllers;

use App\Admin\Services\UserService;
use App\Controllers\AppController;
use App\Enums\Role;
use Dimtrovich\Validation\Exceptions\ValidationException;

class EnseignantsController extends AppController
{
	public function __construct(private UserService $userService)
	{
	}

	public function index()
	{
		$data['enseignants'] = $this->userService->search(
			Role::ENSEIGNANT, 
			$this->request->string('search'), 
			$this->request->integer('page'),
			$this->request->integer('limit', 15),
			$this->request->string('sortColumn', 'created_at'),
			$this->request->string('sortDirection', 'desc'),
		);

		return inertia('Admin/Enseignants/Index', $data);
	}

	public function create()
	{
		try {
			$user = $this->userService->create(Role::ENSEIGNANT, $this->request);
		} catch (ValidationException $e) {
			return back()->withErrors($e->getErrors()?->firstOfAll() ?: $e->getMessage());
		}

		return back()->with('success', __('Enseignant ajouté avec succès'));
	}
}
