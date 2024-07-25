<?php

namespace App\Admin\Controllers;

use App\Controllers\AppController;
use App\Entities\Formation;
use BlitzPHP\Exceptions\ValidationException;

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
				'intitule'    => ['required', 'string', 'max:255'],
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
}
