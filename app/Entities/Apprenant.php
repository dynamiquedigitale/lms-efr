<?php

namespace App\Entities;

class Apprenant extends AppEntity
{
	protected array|bool $guarded = false;
    public array|bool $timestamps = false;
    public bool $incrementing = false;

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
