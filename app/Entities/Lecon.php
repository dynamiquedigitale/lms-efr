<?php

namespace App\Entities;

class Lecon extends AppEntity
{
	public function formations()
	{
		return $this->belongsToMany(Formation::class, 'lecons_formations');
	}
}
