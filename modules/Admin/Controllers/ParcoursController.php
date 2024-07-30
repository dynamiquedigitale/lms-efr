<?php

namespace App\Admin\Controllers;

use App\Controllers\AppController;
use App\Entities\Cours;
use App\Entities\Formation;
use App\Entities\Parcours;
use App\Enums\Role;
use BlitzPHP\Exceptions\ValidationException;
use BlitzPHP\Validation\Rule;

class ParcoursController extends AppController
{
	public function index()
	{
		$search = $this->request->search;
		
		$items = Parcours::when($search, function ($query) use ($search) {
				$query->whereRelation('formation', fn($q) => $q->whereLike('intitule', $search));
			})
			->latest()
			->with('formation', 'enseignant', 'apprenant')
			->withCount('cours')
			->paginate($this->request->query('limit', 15))
			->toArray();
		
		$data['parcours'] = $items;

		return inertia('Admin/Parcours/Index', $data);
	}

	public function create()
	{
		try {
            $post = $this->validate([
				'formation_id'  => ['required', 'integer', 'exists:formations,id'],
				'enseignant_id' => ['required', 'integer', Rule::exists('users', 'id')->where('type', Role::ENSEIGNANT)],
				'apprenant_id'  => ['required', 'integer', Rule::exists('users', 'id')->where('type', Role::APPRENANT)],
            ]);
        }
        catch (ValidationException $e) {
            return back()->withErrors($e->getErrors()?->firstOfAll() ?: $e->getMessage());
        }

		if (Parcours::where($post->except('enseignant_id'))->count()) {
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

			foreach ($formation->lecons as $i => $lecon) {
				$cours[] = [
					'rang'     => ($i + 1),
					'statut'   => $i == 0 ? 'in-progress' : 'inactive',
					'lecon_id' => $lecon->id,
				];
			}

			if ($cours === []) {
				return back()->withErrors('Cette formation n\'a pas de leçon. Veuillez ajouter des leçons à la formation au préalable');
			}

			$parcours = Parcours::create($post->all() + ['progression' => 0]);
			Cours::bulckInsert(array_map(fn($v) => $v + ['parcour_id' => $parcours->id], $cours));
			
			$db->commit();

		} catch (\Throwable $th) {
			$db->rollback();
			return back()->withErrors(__('Une erreur s\'est produite lors de l\'opération'));
		}
		
		return back()->with('success', __('Parcours crée avec succès'));
	}
}
