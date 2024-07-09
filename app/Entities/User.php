<?php

namespace App\Entities;

use BlitzPHP\Facades\Storage;
use BlitzPHP\Schild\Entities\User as SchildUser;
use BlitzPHP\Wolke\Casts\Attribute;

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
	/** {@inheritDoc} */
	protected array $appends = [
		'role'
	];

	public function apprenant()
	{
		return $this->hasOne(Apprenant::class);
	}

	public function getRoleAttribute()
	{
		return match (true) {
			$this->inGroup('admin')      => __('Administrateur'),
			$this->inGroup('enseignant') => __('Enseignant'),
			default                      => __('Apprenant'),
		};
	}

	protected function avatar(): Attribute
    {
        return Attribute::make(
            get: function(?string $value) {
				if (empty($value)) {
					$value = in_array($this->sexe, ['m', 'f'], true) ? $this->sexe : 'default';
					$value = 'avatar/' . $value . '.png';
				}

				return Storage::url($value);
			},
        );
    }
}
