<?php

namespace App\Admin\Controllers;

use App\Controllers\AppController;
use App\Entities\AppEntity;
use App\Entities\User;
use App\Enums\Role;
use App\Models\UserModel;
use BlitzPHP\Container\Services;
use BlitzPHP\Exceptions\ValidationException;
use BlitzPHP\Wolke\Pagination\LengthAwarePaginator;

class ApprenantsController extends AppController
{
	public function index()
	{
		['items' => $items, 'total' => $total] = model(UserModel::class)->searchApprenants(
			[
				'nom'       => $this->request->string('search'),
				'prenom'    => $this->request->string('search'),
				'matricule' => $this->request->string('search'),
			],
			$currentPage = $this->request->integer('page'),
			$perPage = $this->request->integer('limit', 15),
			$this->request->string('sortColumn', 'created_at'),
			$this->request->string('sortDirection', 'desc'),
		);

		$paginator = new LengthAwarePaginator($items, $total, $perPage, $currentPage);
		
		$data['apprenants'] = $paginator->toArray();

		return inertia('Admin/Apprenants/Index', $data);
	}

	public function create()
	{
		try {
			$post = $this->validate([
				'nom'        => ['required', 'string', 'max:64'],
				'prenom'     => ['nullable', 'string', 'max:64'],
				'email'      => ['required', 'email', 'unique:auth_identities,secret'],
				'tel'        => ['required', 'phone', 'unique:users'],
				'date_naiss' => ['nullable', 'date:Y-m-d'],
				'sexe'       => ['nullable', 'in:m,f,autre'],
				'adresse'    => ['nullable', 'json'],
	
				'created_by' => ['default:' . user_id(), 'integer'],
				'matricule'  => ['default:' . AppEntity::generateRef(User::class, Role::APPRENANT), 'string'],
				'type'       => ['default:' .Role::APPRENANT, 'string'],
			]);
		} catch (ValidationException $e) {
			return back()->withErrors($e->getErrors()?->firstOfAll() ?: $e->getMessage());
		}

		$user = new User($post->except('email'));
		$user->setEmail($post['email']);
		$user->setPassword(uniqid());
		$user->save();
		$user->saveEmailIdentity();
		$user->addGroup('user', Role::APPRENANT);
		$user->activate();

		Services::event()->trigger('user.create', $user);

		return back()->with('success', __('Apprenant ajouté avec succès'));
	}

	/**
	 * Liste des formations suivies par un apprenant
	 */
	public function formations($id) 
	{
		return compact('id');
		// return Parcour::where('user_id', $id)->withCount(['cours', 'examens'])->get();
	}
}
