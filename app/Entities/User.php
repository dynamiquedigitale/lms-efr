<?php

namespace App\Entities;

use BlitzPHP\Schild\Entities\User as SchildUser;

class User extends SchildUser
{
	/** {@inheritDoc} */
	protected array $fillable = [
        'username', 'active',
        'matricule', 'tel', 'nom', 'prenom', 'sexe', 'avatar', 'adresse'
	];
	/** {@inheritDoc} */
    protected array $casts = [
        'id'          => '?integer',
        'active'      => 'boolean',
        'permissions' => 'array',
        'groups'      => 'array',
        'adresse'     => 'array',
    ];

	public function apprenant()
	{
		return $this->hasOne(Apprenant::class);
	}
}
