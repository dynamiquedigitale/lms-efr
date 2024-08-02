<?php

namespace App\Admin\Controllers;

use App\Controllers\AppController;
use App\Entities\Formation;
use App\Entities\Lecon;
use App\Entities\Parcours;
use BlitzPHP\Contracts\Http\StatusCode;
use BlitzPHP\Exceptions\ValidationException;
use BlitzPHP\Facades\Storage;
use BlitzPHP\Validation\Rule;
use BlitzPHP\Wolke\Pagination\LengthAwarePaginator;

class FormationsController extends AppController
{
	public function index()
	{
		$search = $this->request->search;
		
		$items = Formation::when($search, function ($query) use ($search) {
				$query->whereLike('intitule', $search);
			})
			->sortAsc('intitule')
			->latest()
			->withCount(['lecons', 'parcours']);
		
		if (-1 == $limit = $this->request->query('limit', 15)) {
			$items = $items->all();
			$limit = count($items);

			$items = new LengthAwarePaginator($items, $limit, $limit, 1);
		} else {
			$items = $items->paginate($limit);
		}		
		
		$data['formations'] = $items->toArray();

		if (! $this->request->hasHeader('X-Inertia') && $this->request->ajax()) {
			return $data['formations'];
		}

		return inertia('Admin/Formations/Index', $data);
	}

	public function create()
	{
		try {
            $post = $this->validate([
				'intitule'    => ['required', 'string', 'max:255', 'unique:formations'],
				'niveau'      => ['required', 'string', 'in:debutant,moyen,avance,expert'],
				'description' => ['required', 'string'],
				'objectif'    => ['required', 'string'],
				'cover'       => ['nullable', 'image', 'max:2000'],
				'lecons'      => ['nullable', 'array'],
    			'lecons.*'    => ['integer', 'exists:lecons,id']
            ]);
        }
        catch (ValidationException $e) {
            return back()->withErrors($e->getErrors()?->firstOfAll() ?: $e->getMessage());
        }

		Formation::create($post->except('lecons', 'cover') + [
			'created_by' => user_id(),
			'cover'      => $this->request->file('cover')->store('formations')
		]);
		
		return back()->with('success', __('Formation ajoutée avec succès'));
	}

	public function delete($id = null)
	{
		/** @var Formation $formation */
		if (empty($formation = Formation::find($id))) {
			return back()->withErrors(__('Formation non reconnue'));
		}

		Storage::delete($formation->cover);
		$formation->lecons()->detach();
		$formation->delete();

		return back()->with('success', __('Formation supprimée avec succès'));
	}

	public function update($id = null)
	{
		try {
            $post = $this->validate([
				'intitule'    => ['required', 'string', 'max:255', Rule::unique('formations')->ignore($id)],
				'niveau'      => ['required', 'string', 'in:debutant,moyen,avance,expert'],
				'description' => ['required', 'string'],
				'objectif'    => ['required', 'string'],
				// 'cover'       => ['nullable', 'image', 'max:2000'],
			]);
        }
        catch (ValidationException $e) {
            return back()->withErrors($e->getErrors()?->firstOfAll() ?: $e->getMessage());
		}

		/** @var Formation $formation */
		if (empty($formation = Formation::find($id))) {
			return back()->withErrors(__('Formation non reconnue'));
		}

		if ($this->request->hasFile('cover')) {
			Storage::delete($formation->cover);
			$post['cover'] = $this->request->file('cover')->store('formations');
		}

		$formation->update($post->all());

		return back()->with('success', __('Formation éditée avec succès'));
	}

	/**
	 * Lecons affectees a une formation
	 */
	public function lecons($id)
	{
		$lecons = Lecon::sortAsc('intitule');

		if ($this->request->boolean('where-not')) {
			$lecons = $lecons->whereDoesntHave('formations', fn($q) => $q->where('formations.id', $id));
		} else {
			$lecons = $lecons->with('formations')->whereHas('formations', fn($q) => $q->where('formations.id', $id));
		}

		$lecons = $lecons->get();

		if (!$this->request->boolean('where-not')) {
			$lecons = $lecons->sortBy([
				fn($a, $b) => $a->formations[0]->pivot->rang - $b->formations[0]->pivot->rang,
				fn($a, $b) => $a->formations[0]->pivot->created_at?->isAfter($b->formations[0]->pivot->created_at) ? 0 : 1,
			])
			->values();
		}

		return $lecons;
	}

	/**
	 * Affecte un/plusieurs lecons a une formation
	 */
	public function addLecons($id)
	{
		try {
            $post = $this->validate([
				'lecons'   => ['required', 'array'],
				'lecons.*' => ['integer', 'exists:lecons,id'],
			]);
        }
        catch (ValidationException $e) {
			return $this->response->json(['errors' => $e->getErrors()?->firstOfAll() ?: $e->getMessage()], StatusCode::BAD_REQUEST);
		}
		
		/** @var Formation $formation */
		if (empty($formation = Formation::find($id))) {
			return $this->response->json(['errors' => ['default' => __('Formation non reconnue')]], StatusCode::BAD_REQUEST);
		}

		$formation->lecons()->syncWithoutDetaching($post['lecons']);

		return $this->response->json(['message' => __('Leçons ajoutées avec succès')]);
	}
	/**
	 * Reorganise les lecons d'une formation
	 */
	public function sortLecons($id)
	{
		try {
            $post = $this->validate([
				'lecons'   => ['required', 'array'],
				'lecons.*' => ['integer', 'exists:lecons,id'],
			]);
        }
        catch (ValidationException $e) {
			return $this->response->json(['errors' => $e->getErrors()?->firstOfAll() ?: $e->getMessage()], StatusCode::BAD_REQUEST);
		}

		/** @var \BlitzPHP\Database\Connection\BaseConnection $db */
		$db = service('database');	
		try {
			$db->beginTransaction();

			foreach ($post['lecons'] as $k => $v) {
				$db->table('lecons_formations')->where(['lecon_id' => $v, 'formation_id' => $id])->update(['rang' => $k + 1]);		
			}

			$db->commit();
		} catch (\Throwable $e) {
			$db->rollback();
			return $this->response->json(['errors' =>  $e->getMessage()], StatusCode::INTERNAL_ERROR);
		}

		return $this->response->json(['message' => __('Ok')]);
	}
	/**
	 * Retire des lecons a une formation
	 */
	public function removeLecons($id)
	{
		try {
            $post = $this->validate([
				'lecons'   => ['required', 'array'],
				'lecons.*' => ['integer', 'exists:lecons,id'],
			]);
        }
        catch (ValidationException $e) {
			return $this->response->json(['errors' => $e->getErrors()?->firstOfAll() ?: $e->getMessage()], StatusCode::BAD_REQUEST);
		}
		/** @var Formation $formation */
		if (empty($formation = Formation::find($id))) {
			return $this->response->json(['errors' => ['default' => __('Formation non reconnue')]], StatusCode::NOT_FOUND);
		}

		$formation->lecons()->detach($post['lecons']);

		return $this->response->json(['message' => __('Lecons retirées avec succès')]);
	}

	/**
	 * Parcours utilisant une formation
	 */
	public function parcours($id)
	{
		return Parcours::where('formation_id', $id)
			->with(['apprenant', 'enseignant'])
			->withCount('cours')
			->get();
	}
}
