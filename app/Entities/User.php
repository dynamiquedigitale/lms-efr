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
		'role', 'group',
	];

	public function getGroupAttribute()
	{
		return match (true) {
			$this->inGroup(Role::ADMIN)      => Role::ADMIN,
			$this->inGroup(Role::ENSEIGNANT) => Role::ENSEIGNANT,
			default                          => Role::APPRENANT,
		};
	}

	public function getRoleAttribute()
	{
		return match ($this->group) {
			Role::ADMIN      => __('Administrateur'),
			Role::ENSEIGNANT => __('Enseignant'),
			default          => __('Apprenant'),
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
