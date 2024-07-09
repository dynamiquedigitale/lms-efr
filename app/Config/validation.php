<?php 

/*
| -------------------------------------------------- -----------------
| CONFIGURATION DES VALIDATIONS
| -------------------------------------------------- -----------------
| Ce fichier contiendra les règles de validation génériques qui pouront être utilisées par les systèmes tiers.
| Par ailleurs, la clé 'rules' vous permettra d'ajouter les règles de validation supplémentaires
|
| Pour des instructions complètes, veuillez consulter la « Validation des données » dans le Guide de l'utilisateur.
*/

return [
    /**
     * Stocke les classes contenant les règles personnalisées disponibles.
     * 
     * @var string[]
     */
    'rules' => [

    ],

    // --------------------------------------------------------------------
    // REGLES
    // --------------------------------------------------------------------

	/**
	 * Regles de validation de l'inscription
	 */
	'register' => [
		'nom' => [
			'label'    => __('Nom'),
			'rules'    => ['required', 'string', 'max:64'],
			'messages' => [],
		],
		'prenom' => [
			'label'    => __('Prenom'),
			'rules'    => ['nullable', 'string', 'max:64'],
			'messages' => [],
		],
		'tel' => [
			'label'    => __('Téléphone'),
			'rules'    => ['required', 'string', 'phone', 'unique:users'],
			'messages' => [],
		],
		'email' => [
			'label'    => lang('Auth.email'),
			'rules'    => ['required', 'email', 'unique:auth_identities,secret'],
			'messages' => [],
		],
		'password' => [
			'label'    => lang('Auth.password'),
			'rules'    => ['required', 'password'],
			'messages' => [
				'required' => lang('Auth.errorPasswordEmpty'),
			],	
		],
		/**
		 * Permet a Schild d'automatiquement inserer un matricule a l'utilisateur lors de l'inscription
		 */
		'matricule' => [
			'rules' => ['default:' . \App\Entities\Apprenant::genereteRef(), 'string'], 
		],
	],
	/**
	 * Regles de validation de la connexion
	 */
	'login' => [
		'login' => [
			'label'    => __('Email ou téléphone'),
			'rules'    => ['required', 'string'],
			'messages' => [],
		],
		'password' => [
			'label'    => lang('Auth.password'),
			'rules'    => ['required', 'password'],
			'messages' => [
				'required' => lang('Auth.errorPasswordEmpty'),
			],	
		],
	]
];
