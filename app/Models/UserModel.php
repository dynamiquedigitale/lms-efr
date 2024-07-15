<?php 

namespace App\Models;

use App\Entities\User;
use App\Enums\Role;
use BlitzPHP\Database\Builder\BaseBuilder;
use BlitzPHP\Schild\Models\UserModel as SchildUserModel;

class UserModel extends SchildUserModel
{
    protected string $returnType = User::class;

	/**
	 * @return array{total: int, items: array<User>}
	 */
	public function searchEnseignants(array $search, int $page = 1, int $perPage = 15, string $sortColumn = 'created_at', string $sortDirection = 'desc'): array
	{
		$builder = $this->leftJoin('parcours', ['parcours.enseignant_id' => 'users.id'])
			->select('COUNT(parcours.id) as parcours_count');

		$search['role'] = Role::ENSEIGNANT;

		return $this->searchUsers($search, $page, $perPage, $sortColumn, $sortDirection, $builder);
	}
	
	/**
	 * @return array{total: int, items: array<User>}
	 */
	public function searchApprenants(array $search, int $page = 1, int $perPage = 15, string $sortColumn = 'created_at', string $sortDirection = 'desc'): array
	{
		$builder = $this->leftJoin('parcours', ['parcours.apprenant_id' => 'users.id'])
			->select('COUNT(parcours.id) as parcours_count');

		$search['role'] = Role::APPRENANT;

		return $this->searchUsers($search, $page, $perPage, $sortColumn, $sortDirection, $builder);
		
	}

	/**
	 * @return array{total: int, items: array<User>}
	 */
	public function searchUsers(array $search, int $page = 1, int $perPage = 15, string $sortColumn = 'created_at', string $sortDirection = 'desc', ?self $builder = null): array
    {
		$builder ??= $this;

		$builder = $builder->withIdentities()
            ->select('users.*')
            ->leftJoin('auth_groups_users', ['auth_groups_users.user_id' => 'users.id'])
			->when(
				isset($search['role']) && $search['role'] !== 'all',
				static fn ($query) => $query->like('auth_groups_users.group', $search['role'])
			)
			->when(
				isset($search['id']) && $search['id'] !== '',
				static fn ($query) => $query->like('users.id', $search['id'])
			)
			->groupBy('users.id')
            ->orderBy($sortColumn, $sortDirection);

		if (!empty($search['nom']) || !empty($search['prenom'])) {
			$builder->where(function($q) use($search) {
				$q->when(
					isset($search['nom']) && $search['nom'] !== '',
					static fn ($query) => $query->orLike('users.nom', $search['nom'], 'both')
				)
				->when(
					isset($search['prenom']) && $search['prenom'] !== '',
					static fn ($query) => $query->orLike('users.prenom', $search['prenom'], 'both')
				);
			});
		}

		$results = $builder->paginate(
			$perPage, 
			$page,
			$total = $builder->countAllResults(false)
		);

        if (empty($results)) {
            return [
				'total' => 0,
				'items' => []
			];
        }

        // Determine groups for users
        $userIds   = array_map('intval', array_column($results, 'id'));
        $userRoles = model(GroupModel::class)->getForUsers($userIds);

        $roleNames = array_combine(
            array_keys(config('auth-groups.groups')),
            array_column(config('auth-groups.groups'), 'title')
        );

        foreach ($results as $row) {
            // Set user-friendly group names
            if (isset($userRoles[$row->id])) {
                $roles = [];

                foreach ($userRoles[$row->id] as $role) {
                    $roles[] = $roleNames[$role];
                }
                $row->roles = $roles;
            }
        }

        return [
			'total' => $total,
			'items' => $results
		];
    }
	
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
