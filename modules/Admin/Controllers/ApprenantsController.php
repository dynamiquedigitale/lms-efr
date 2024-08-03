<?php

namespace App\Admin\Controllers;

use App\Admin\Services\UserService;
use App\Controllers\AppController;
use App\Entities\Parcours;
use App\Entities\User;
use App\Enums\Role;
use App\Enums\Statut;
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
		$parcours = Parcours::where('apprenant_id', $id)->with(['enseignant', 'formation'])->withCount('cours');
		
		if ($this->request->has('statut')) {
			$statut = $this->request->string('statut');
			$parcours = $parcours->whereIn('statut', explode(',', $statut));
		}
		if ($this->request->boolean('with-cours')) {
			$parcours = $parcours->with([
				'cours' => fn($q) => $q->sortAsc(['rang', 'created_at'])->select(['id', 'lecon_id', 'parcour_id', 'rang', 'statut'])
										->with(['lecon' => fn($sq) => $sq->select(['id', 'intitule'])])
			]);
		}
		
		return $parcours->get();
	}

	/**
	 * Liste des apprenants pour les liste deroulantes
	 */
	public function list()
	{
		/** @var User $apprenants */
		$apprenants = User::apprenants();

		if ($this->request->boolean('with-active-path')) { /* Apprenants ayant un parcours actif */
			$apprenants = $apprenants->whereHas('parcours_apprenant', fn($q) => $q->whereIn('parcours.statut', [Statut::IN_PROGRESS, Statut::ACTIVE]));
		}

		return $apprenants->get()->map(fn($a) => $a->toArray());
	}
}
