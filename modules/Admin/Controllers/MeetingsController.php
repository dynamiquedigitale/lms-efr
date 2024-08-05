<?php

namespace App\Admin\Controllers;

use App\Controllers\AppController;
use App\Entities\Meeting;
use BlitzPHP\Exceptions\ValidationException;

class MeetingsController extends AppController
{
	public function index()
	{
		$items = Meeting::latest()
			->with(['parcours' => fn($q) => $q->with('apprenant', 'enseignant', 'formation')])
			->with('cours.lecon')
			->get();
		
		$data['meetings'] = $items;

		return inertia('Admin/Meetings/Index', $data);
	}

	public function create()
	{
		try {
			$post = $this->validate([
				'cour_id'    => ['nullable', 'integer', 'exists:cours,id'],
				'parcour_id' => ['required', 'integer', 'exists:parcours,id'],
				'date_deb'   => ['required', 'datetime', 'after:today'],
				'duree'      => ['required', 'integer', 'min:10'],
				'libelle'    => ['required', 'string', 'max:128'],
				'objectif'   => ['required', 'string']
			]);
		} catch (ValidationException $e) {
			return back()->withErrors($e->getErrors()?->firstOfAll() ?: $e->getMessage());
		}

		$meeting = Meeting::create($post->all());

		service('event')->trigger('meeting.create', $meeting);

		return back()->with('success', __('Meeting programmé avec succès'));
	}

	public function delete($id = null)
	{
		/** @var Meeting $meeting */
		if (empty($meeting = Meeting::find($id))) {
			return back()->withErrors(__('Meeting non reconnu'));
		}

		// @todo on supprime les memos associes

		$meeting->delete();

		return back()->with('success', __('Meeting supprimé avec succès'));
	}
}
