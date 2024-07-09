<?php 

namespace App\Models;

use App\Entities\User;
use BlitzPHP\Database\Builder\BaseBuilder;
use BlitzPHP\Schild\Models\UserModel as SchildUserModel;
class UserModel extends SchildUserModel
{
    protected string $returnType = User::class;

	/**
	 * {@inheritDoc}
	 * 
	 * @override
	 */
	protected function fetchByCredentials(array $credentials, BaseBuilder $builder): ?BaseBuilder
	{
		if (null === $login = ($credentials['login'] ?? null)) {
			return parent::fetchByCredentials($credentials, $builder);
        }

		return $builder->where(function($q) use($login) {
			return $q->orWhere([
				'LOWER(' . $this->tables['identities'] . '.secret)' => strtolower($login),
						 'tel'                                      => simple_tel($login),
			]);    
		});
	}
}
