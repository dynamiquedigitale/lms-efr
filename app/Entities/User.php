<?php

namespace App\Entities;

use App\Enums\Role;
use BlitzPHP\Facades\Storage;
use BlitzPHP\Schild\Entities\User as SchildUser;
use BlitzPHP\Wolke\Casts\Attribute;

class User extends SchildUser
{
    /** {@inheritDoc} */
    protected array $fillable = [];

    /** {@inheritDoc} */
    protected array|bool $guarded = false;

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
		'role',
		'user_email',
	];

	public function getRoleAttribute()
	{
		return match ($this->type) {
			Role::ADMIN      => __('Administrateur'),
			Role::ENSEIGNANT => __('Enseignant'),
			default          => __('Apprenant'),
		};
	}
	
	public function getUserEmailAttribute()
	{
		return $this->getEmail();
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

	protected function username(): Attribute
	{
		return Attribute::make(
			get: function(?string $value) {
				return $value ?: $this->prenom . ' ' . $this->nom;
			},
		);
	}
}
