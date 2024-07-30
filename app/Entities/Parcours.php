<?php

namespace App\Entities;

use App\Enums\Role;

class Parcours extends AppEntity
{
	/** {@inheritDoc} */
    protected string $table = 'parcours';

	public function formation()
	{
		return $this->belongsTo(Formation::class);
	}
	
	public function enseignant()
	{
		return $this->belongsTo(User::class, 'enseignant_id')->where('type', Role::ENSEIGNANT);
	}
	
	public function apprenant()
	{
		return $this->belongsTo(User::class, 'apprenant_id')->where('type', Role::APPRENANT);
	}

	public function cours()
	{
		return $this->hasMany(Cours::class, 'parcour_id');
	}
}
