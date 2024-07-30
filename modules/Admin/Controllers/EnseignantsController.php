<?php

namespace App\Admin\Controllers;

use App\Admin\Services\UserService;
use App\Controllers\AppController;
use App\Entities\Ressource;
use App\Entities\User;
use App\Enums\Role;
use BlitzPHP\Contracts\Http\StatusCode;
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

		if (! $this->request->hasHeader('X-Inertia') && $this->request->ajax()) {
			return $data['enseignants'];
		}

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

	/**
	 * Ressources affectees a un enseignant
	 */
	public function ressources($id)
	{
		$ressources = Ressource::withCount('enseignants');

		if ($this->request->boolean('where-not')) {
			$ressources = $ressources->whereDoesntHave('enseignants', fn($q) => $q->where('users.id', $id));
		} else {
			$ressources = $ressources->whereHas('enseignants', fn($q) => $q->where('users.id', $id));
		}
		
		return $ressources->get();
	}

	/**
	 * Affecte un/plusieurs ressources a un enseignant
	 */
	public function addRessources($id)
	{
		try {
            $post = $this->validate([
				'ressources'   => ['required', 'array'],
				'ressources.*' => ['integer', 'exists:ressources,id'],
			]);
        }
        catch (ValidationException $e) {
			return $this->response->json(['errors' => $e->getErrors()?->firstOfAll() ?: $e->getMessage()], StatusCode::BAD_REQUEST);
		}
		/** @var User $enseignant */
		if (empty($enseignant = User::enseignants()->withCount('ressources')->find($id))) {
			return $this->response->json(['errors' => ['default' => __('Enseignant non reconnu')]], StatusCode::NOT_FOUND);
		}

		$possible = env('VITE_MAX_RESSOURCES_ENSEIGNANT', 10) - $enseignant->ressources_count;
		$nbr      = count($post['ressources']);
		if ($possible < $nbr) {
			return $this->response->json(
				['errors' => ['default' => 'Impossible d\'ajouter ' . $nbr . ' nouvelles ressources. Seules ' . $possible . ' sont autorisées à être ajouté']], 
				StatusCode::NOT_ACCEPTABLE
			);
		}

		$enseignant->ressources()->syncWithoutDetaching($post['ressources']);

		return $this->response->json(['message' => __('Ressources ajoutées avec succès')]);
	}
}
