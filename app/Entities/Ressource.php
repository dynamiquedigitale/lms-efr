<?php

namespace App\Entities;

use BlitzPHP\Facades\Storage;

class Ressource extends AppEntity
{
	/** {@inheritDoc} */
	protected array $appends = [
		'url',
	];

	public function getUrlAttribute(): string
	{
		return Storage::url($this->path);
	}
}
