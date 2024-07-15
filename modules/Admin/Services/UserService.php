<?php

namespace App\Admin\Services;

use App\Entities\AppEntity;
use App\Entities\User;
use App\Enums\Role;
use App\Models\UserModel;
use BlitzPHP\Container\Services;
use BlitzPHP\Http\Request;
use BlitzPHP\Wolke\Pagination\LengthAwarePaginator;

class UserService
{
	/**
	 * Recherche les utilisateurs en bd en fonction de leurs role
	 */
	public function search(string $role, array|string|null $search, int $currentPage = 1, $perPage = 15, string $sortColumn = 'created_at', string $sortDirection = 'desc'): array
	{
		if (is_string($search)) {
			$search = [
				'nom'       => $search,
				'prenom'    => $search,
				'matricule' => $search,
			];
		} else if ($search === null) {
			$search = [];
		}

		$params = [
			$search,
			$currentPage,
			$perPage,
			$sortColumn,
			$sortDirection
		];

		$model = model(UserModel::class);

		['items' => $items, 'total' => $total] = match ($role) {
			Role::APPRENANT => $model->searchApprenants(...$params),
			Role::ENSEIGNANT => $model->searchEnseignants(...$params),
			default => [[], 0],
		};

		$paginator = new LengthAwarePaginator($items, $total, $perPage, $currentPage);

		return $paginator->toArray();
	}

	/**
	 * Creation d'un utilisateur
	 */
	public function create(string $role, Request $request): User
	{
		$rules = [
			'nom'        => ['required', 'string', 'max:64'],
			'prenom'     => ['nullable', 'string', 'max:64'],
			'email'      => ['required', 'email', 'unique:auth_identities,secret'],
			'tel'        => ['required', 'phone', 'unique:users'],
			'sexe'       => ['required', 'in:m,f,autre'],
			'adresse'    => ['nullable', 'json'],

			'created_by' => ['default:' . user_id(), 'integer'],
			'matricule'  => ['default:' . AppEntity::generateRef(User::class, $role), 'string'],
			'type'       => ['default:' . $role, 'string'],
		];

		$rules = array_merge($rules, match ($role) {
			Role::APPRENANT => [
				'date_naiss' => ['nullable', 'date:Y-m-d'],
			],
			Role::ENSEIGNANT => [
				'taux_horaire'    => ['required', 'integer'],
				'piece_identite'  => ['nullable', 'string'],
				'numero_identite' => ['required_with:piece_identite', 'string', 'unique:users'],
				'diplome'         => ['nullable', 'in:bac,bac1,bac2,licence,m1,m2,doctorat'],
				'specialite'      => ['required_with:diplome', 'string', 'max:128'],
				'document'        => ['required_with:piece_identite', 'image', 'max:2000'],
			],
			default => [],
		});

		$post =  $request->validate($rules);

		if ($post->has('adresse')) {
			$post['adresse'] = json_decode($post['adresse'], true);
		}
		if ($post->has('document')) {
			$post['documents'] = [[
				'type' => $post['piece_identite'],
				'path' => $request->file('document')->store('documents')
			]];
		}

		$user = new User($post->except('email', 'document'));
		$user->setEmail($post['email']);
		$user->setPassword(uniqid());
		$user->save();
		$user->saveEmailIdentity();
		$user->addGroup('user', $role);
		$user->activate();

		Services::event()->trigger('user.create', $user);

		return $user;
	}
}
