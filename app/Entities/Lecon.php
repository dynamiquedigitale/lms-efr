<?php

namespace App\Entities;

class Lecon extends AppEntity
{
	/** {@inheritDoc} */
	protected array $appends = [
		'abbr',
	];

	public function formations()
	{
		return $this->belongsToMany(Formation::class, 'lecons_formations')->withPivot('rang', 'created_at');
	}

	public function getAbbrAttribute() 
	{
		return implode('', array_map(fn($e) => ucfirst($e[0]), array_slice(explode(' ', $this->intitule), 0, 2)));
	}
}
