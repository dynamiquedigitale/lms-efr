<?php

namespace App\Entities;

class Cours extends AppEntity
{
	/** {@inheritDoc} */
    protected string $table = 'cours';

	public function parcours()
	{
		return $this->belongsTo(Parcours::class, 'parcour_id');
	}
	
	public function lecon()
	{
		return $this->belongsTo(Lecon::class);
	}
}
