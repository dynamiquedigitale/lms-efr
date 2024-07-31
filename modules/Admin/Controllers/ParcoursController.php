<?php

namespace App\Admin\Controllers;

use App\Controllers\AppController;
use App\Entities\Cours;
use App\Entities\Formation;
use App\Entities\Parcours;
use App\Enums\Role;
use App\Enums\Statut;
use BlitzPHP\Exceptions\ValidationException;
use BlitzPHP\Validation\Rule;

class ParcoursController extends AppController
{
	public function index()
	{
		$search = $this->request->search;
		$filter = $this->request->filter;
		
		$items = Parcours::when($search, function ($query) use ($search) {
				$query->whereRelation('formation', fn($q) => $q->whereLike('intitule', $search));
			})
			->when($filter, function ($query) use ($filter) {
				if ($filter != 'all') {
					$query->where('statut', $filter);
				}
			})
			->latest()
			->with('formation', 'enseignant', 'apprenant')
			->withCount('cours')
			->paginate($this->request->query('limit', 15))
			->toArray();
		
		$data['parcours'] = $items;
		$data['stats']    = [];

		foreach (['all', Statut::IN_PROGRESS, Statut::COMPLETED, Statut::UNPAID] as $statut) {
			$data['stats'][$statut] = $statut === 'all' ? Parcours::count() : Parcours::where(compact('statut', 'statut'))->count();
		}

		return inertia('Admin/Parcours/Index', $data);
	}

	public function create()
	{
		try {
            $post = $this->validate([
				'formation_id'  => ['required', 'integer', 'exists:formations,id'],
				'enseignant_id' => ['required', 'integer', Rule::exists('users', 'id')->where('type', Role::ENSEIGNANT)],
				'apprenant_id'  => ['required', 'integer', Rule::exists('users', 'id')->where('type', Role::APPRENANT)],
				'objectif'      => ['nullable', 'string'],
				'lecons'        => ['nullable', 'array'],
				'lecons.*'      => ['integer', 'exists:lecons,id'],
            ]);
        }
        catch (ValidationException $e) {
            return back()->withErrors($e->getErrors()?->firstOfAll() ?: $e->getMessage());
        }

		if (Parcours::where($post->only('formation_id', 'apprenant_id'))->count()) {
			return back()->withErrors('Cet apprenant suit déjà cette formation');
		}

		/** @var \BlitzPHP\Database\Connection\MySQL $db */
		$db = service('database');

		try {
			$db->beginTransaction();

			$formation = Formation::with([
				'lecons' => fn($q) => $q->withPivot(['rang', 'created_at'])->orderByPivot('rang', 'asc')->orderByPivot('created_at', 'asc')
			])
			->find($post['formation_id']);

			$cours = [];

			if (empty($lecons = $post['lecons'])) {
				$lecons = $formation->lecons->map(fn($lecon) => $lecon->id)->all();
			}

			foreach ($lecons as $i => $lecon_id) {
				$cours[] = [
					'rang'     => ($i + 1),
					'statut'   => $i == 0 ? Statut::IN_PROGRESS : Statut::INACTIVE,
					'lecon_id' => $lecon_id,
				];
			}

			if ($cours === []) {
				return back()->withErrors('Cette formation n\'a pas de leçon. Veuillez ajouter des leçons à la formation au préalable');
			}

			$parcours = Parcours::create($post->except('lecons', 'objectif') + [
				'objectif' => $post['objectif'] ?? $formation->objectif,
			]);
			Cours::bulckInsert(array_map(fn($v) => $v + ['parcour_id' => $parcours->id], $cours));
			
			$db->commit();

		} catch (\Throwable $th) {
			$db->rollback();
			return back()->withErrors(__('Une erreur s\'est produite lors de l\'opération'));
		}
		
		return back()->with('success', __('Parcours crée avec succès'));
	}
}
