<?php

namespace App\Admin\Controllers;

use App\Controllers\AppController;
use App\Entities\Ressource;
use App\Entities\User;
use App\Enums\Role;
use BlitzPHP\Exceptions\ValidationException;
use BlitzPHP\Facades\Storage;
use BlitzPHP\Filesystem\Files\UploadedFile;
use BlitzPHP\Validation\Rule;

class RessourcesController extends AppController
{
	public function index()
	{
		$search   = $this->request->search;

		$data['ressources'] = Ressource::when($search, function ($query) use ($search) {
				$query->whereLike("nom", $search);
			})
            ->latest()
			->all();

		return inertia('Admin/Ressources/Index', $data);
	}

	public function create()
	{
		try {
            $post = $this->validate([
				'files'            => ['required', 'array'],
				'files.*.nom'      => ['required', 'string', 'max:255'],
				'files.*.ext'      => ['nullable', 'string'],
				'files.*.mime'     => ['nullable', 'string'],
				'files.*.size'     => ['nullable', 'integer'],
				'files.*.sizeText' => ['nullable', 'string'],
				'files.*.upload'   => ['required', Rule::file()->extensions(['jpg', 'jpeg', 'png', 'mp4', 'avi', 'mp3', 'pdf',  'txt', 'xls', 'xlsx', 'doc', 'docx', 'ppt', 'pptx'])]
            ]);
        }
        catch (ValidationException $e) {
            return back()->withErrors($e->getErrors()?->firstOfAll() ?: $e->getMessage());
		}

		foreach ($this->request->file('files') as $i => $file) {
			/** @var UploadedFile $file */
			$file = $file['upload'];
			
			Ressource::create([
				'nom'      => pathinfo($post['files'][$i]['nom'], PATHINFO_FILENAME),
				'type'     => $this->retrieveTypeFromMime($file, $post['files'][$i]['ext'] ?? null),
				'path'     => $file->store('ressources'),
				'ext'      => $post['files'][$i]['ext'] ?? $file->clientExtension(),
				'mime'     => $post['files'][$i]['mime'] ?? $file->getMimeType(),
				'size'     => $post['files'][$i]['size'] ?? ($file->getSize() ?? 0),
				'sizeText' => $post['files'][$i]['sizeText'] ?? (($file->getSize() ?? 0) . ' KB'),
			]);
		}

		return back()->with('success', __('Ressource ajoutée avec succès'));
	}

	public function delete($id = null)
	{
		if (empty($ressource = Ressource::find($id))) {
			return back()->withErrors(__('Ressource non reconnue'));
		}

		// on supprime la ressource au prof et au cours

		Storage::delete($ressource->path);
		$ressource->delete();

		return back()->with('success', __('Ressource supprimée avec succès'));
	}

	public function update($id = null)
	{
		try {
            $post = $this->validate([
				'nom'         => ['required', 'string', 'max:255'],
				'description' => ['nullable', 'string', 'max:255'],
			]);
        }
        catch (ValidationException $e) {
            return back()->withErrors($e->getErrors()?->firstOfAll() ?: $e->getMessage());
		}

		if (empty($ressource = Ressource::find($id))) {
			return back()->withErrors(__('Ressource non reconnue'));
		}

		$ressource->update($post->all());

		return back()->with('success', __('Ressource éditée avec succès'));
	}

	/**
	 * Enseignants affectes ou non a une ressource
	 * 
	 * Si le query-params "where-not" existe et vaut "true" alors il s'agira des enseignants qui ne sont pas affectes a la ressources
	 */
	public function enseignants($id)
	{
		$users = User::enseignants()->withCount('ressources');

		if ($this->request->boolean('where-not')) {
			$users = $users->whereDoesntHave('ressources', fn($q) => $q->where('ressources.id', $id));
		} else {
			$users = $users->whereHas('ressources', fn($q) => $q->where('ressources.id', $id));
		}
		
		return $users->get();
	}

	/**
	 * Affecte un/plusieurs enseignants a une ressource
	 */
	public function addEnseignants($id)
	{
		try {
            $post = $this->validate([
				'enseignants'   => ['required', 'array'],
				'enseignants.*' => ['integer', Rule::exists('users', 'id')->where('type', Role::ENSEIGNANT)],
			]);
        }
        catch (ValidationException $e) {
            return back()->withErrors($e->getErrors()?->firstOfAll() ?: $e->getMessage());
		}
		/** @var Ressource $ressource */
		if (empty($ressource = Ressource::find($id))) {
			return back()->withErrors(__('Ressource non reconnue'));
		}

		$ressource->enseignants()->syncWithoutDetaching($post['enseignants']);

		return back()->with('success', __('Enseignants ajoutés avec succès'));
	}


	private function retrieveTypeFromMime(?UploadedFile $file, ?string $ext = null): string
    {
		$ext ??= $file->clientExtension();
        $mimes = [
            'image'     => ['jpg', 'jpeg', 'png'],
            'video'     => ['mp4', 'avi'],
            'audio'     => ['mp3'],
            'doc'       => ['doc', 'docx', 'pdf', 'txt', 'ppt', 'pptx', 'xls', 'xlsx'],
        ];

        foreach ($mimes as $key => $mime) {
            if (in_array($ext, $mime)) {
                return $key;
            }
        }

		$mime = explode('/', $file->getClientMediaType() ?? '')[0];
		if (in_array($mime, array_keys($mimes))) {
			return $mime;
		}
		
		return 'other';
    }
}
