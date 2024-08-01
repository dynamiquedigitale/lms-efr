<?php

namespace App\Admin\Controllers;

use App\Admin\Services\UserService;
use App\Controllers\AppController;
use App\Entities\Parcours;
use App\Enums\Role;
use BlitzPHP\Exceptions\ValidationException;

class ApprenantsController extends AppController
{
	public function __construct(private UserService $userService)
	{
	}

	public function index()
	{
		$data['apprenants'] = $this->userService->search(
			Role::APPRENANT, 
			$this->request->string('search'), 
			$this->request->integer('page'),
			$this->request->integer('limit', 15),
			$this->request->string('sortColumn', 'created_at'),
			$this->request->string('sortDirection', 'desc'),
		);

		if (! $this->request->hasHeader('X-Inertia') && $this->request->ajax()) {
			return $data['apprenants'];
		}

		return inertia('Admin/Apprenants/Index', $data);
	}

	public function create()
	{
		try {
			$user = $this->userService->create(Role::APPRENANT, $this->request);
		} catch (ValidationException $e) {
			return back()->withErrors($e->getErrors()?->firstOfAll() ?: $e->getMessage());
		}

		return back()->with('success', __('Apprenant ajouté avec succès'));
	}

	/**
	 * Liste des formations suivies par un apprenant
	 */
	public function parcours($id)
	{
		return Parcours::where('apprenant_id', $id)
			->with(['enseignant', 'formation'])
			->withCount('cours')
			->get();
	}
}
