<?php

namespace App\Admin\Controllers;

use App\Controllers\AppController;
use App\Entities\Ressource;
use BlitzPHP\Exceptions\ValidationException;
use BlitzPHP\Filesystem\Files\UploadedFile;
use BlitzPHP\Validation\Rule;

class RessourcesController extends AppController
{
	public function index()
	{
		return inertia('Admin/Ressources/Index');
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
				'files.*.upload'   => ['required', Rule::file()->types(['jpg', 'jpeg', 'png', 'mp4', 'avi', 'mp3', 'pdf',  'txt', 'xls', 'xlsx', 'doc', 'docx', 'ppt', 'pptx'])]
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
				'url'      => $file->store('ressources'),
				'ext'      => $post['files'][$i]['ext'] ?? $file->clientExtension(),
				'mime'     => $post['files'][$i]['mime'] ?? $file->getMimeType(),
				'size'     => $post['files'][$i]['size'] ?? ($file->getSize() ?? 0),
				'sizeText' => $post['files'][$i]['sizeText'] ?? (($file->getSize() ?? 0) . ' KB'),
			]);
		}

		return back()->with('success', __('Ressource ajoutée avec succès'));
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
