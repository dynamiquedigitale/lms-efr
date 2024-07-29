<?php

namespace App\Admin\Controllers;

use App\Controllers\AppController;
use App\Entities\Formation;
use App\Entities\Lecon;
use BlitzPHP\Exceptions\ValidationException;
use BlitzPHP\Validation\Rule;

class LeconsController extends AppController
{
	public function index()
	{
		$search = $this->request->search;
		
		$items = Lecon::when($search, function ($query) use ($search) {
				$query->whereLike('intitule', $search);
			})
			->sortAsc('intitule')
			->latest()
			->withCount('formations')
			->paginate($this->request->query('limit', 15))
			->toArray();
		
		$data['lecons'] = $items;

		return inertia('Admin/Lecons/Index', $data);
	}

	public function create()
	{
		try {
			$post = $this->validate([
				'intitule'    => ['required', 'string', 'max:255', 'unique:lecons'],
				'description' => ['nullable', 'string'],
				'resume'      => ['nullable', 'string'],
			]);
		} catch (ValidationException $e) {
			return back()->withErrors($e->getErrors()?->firstOfAll() ?: $e->getMessage());
		}

		Lecon::create($post->all());

		return back()->with('success', __('Leçon ajoutée avec succès'));
	}

	public function delete($id = null)
	{
		/** @var Lecon $lecon */
		if (empty($lecon = Lecon::find($id))) {
			return back()->withErrors(__('Leçon non reconnue'));
		}

		$lecon->delete();

		return back()->with('success', __('Leçon supprimée avec succès'));
	}

	public function update($id = null)
	{
		try {
            $post = $this->validate([
				'intitule'    => ['required', 'string', 'max:255', Rule::unique('lecons')->ignore($id)],
				'description' => ['nullable', 'string'],
				'resume'      => ['nullable', 'string'],
			]);
        }
        catch (ValidationException $e) {
            return back()->withErrors($e->getErrors()?->firstOfAll() ?: $e->getMessage());
		}

		/** @var Lecon $lecon */
		if (empty($lecon = Lecon::find($id))) {
			return back()->withErrors(__('Leçon non reconnue'));
		}

		$lecon->update($post->all());

		return back()->with('success', __('Leçon éditée avec succès'));
	}

	/**
	 * Formation dont fait partie une lecon
	 */
	public function formations($id)
	{
		$formations = Formation::withCount('lecons');

		if ($this->request->boolean('where-not')) {
			$formations = $formations->whereDoesntHave('lecons', fn($q) => $q->where('lecons.id', $id));
		} else {
			$formations = $formations->whereHas('lecons', fn($q) => $q->where('lecons.id', $id));
		}
		
		return $formations->get();
	}
}
