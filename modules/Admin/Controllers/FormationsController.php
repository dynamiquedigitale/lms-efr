<?php

namespace App\Admin\Controllers;

use App\Controllers\AppController;
use App\Entities\Formation;
use BlitzPHP\Exceptions\ValidationException;
use BlitzPHP\Facades\Storage;
use BlitzPHP\Validation\Rule;

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
			->withCount('lecons')
			->paginate($this->request->query('limit', 15))
			->toArray();
		
		$data['formations'] = $items;

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
}
