<?php

namespace App\Entities;

class Meeting extends AppEntity
{
	/** {@inheritDoc} */
    protected function beforeCreate(array $attributes): array
    {
		return $attributes + [
			'key' => self::generateRef() . strtoupper(uniqid('EFRMEETING'))
		];
    }

	public function parcours()
	{
		return $this->belongsTo(Parcours::class, 'parcour_id');
	}
	
}
