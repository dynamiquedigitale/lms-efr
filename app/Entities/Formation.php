<?php

namespace App\Entities;

use BlitzPHP\Facades\Storage;

class Formation extends AppEntity
{
	/** {@inheritDoc} */
	protected array $appends = [
		'cover_url',
	];

	public function lecons()
	{
		return $this->belongsToMany(Lecon::class, 'lecons_formations');
	}

	public function getCoverUrlAttribute(): string
	{
		return Storage::url($this->cover);
	}
}
