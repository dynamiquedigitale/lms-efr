<?php 

namespace App\Controllers;

use BlitzPHP\Schild\Validation\ValidationRules;

class HomeController extends AppController
{
    public function index()
    {
        return inertia('Home');
    }

	/**
	 * Formulaire de reinitialisation du mot de passe
	 */
	public function formResetPassword()
	{
		if (! auth()->loggedIn()) {
			return redirect()->route('login');
		}

		if (true == $data['isMagicLogin'] = session()->getTempdata('magicLogin')) {
			$data['message'] = __('Vous avez demander à modifier votre mot de passe. Remplissez ce formulaire et votre mot de passe sera réinitialisé');
		} else {
			$data['message'] = __('Nous avous constaté que votre mot de passe est compromis. Veuillez remplir ce formulaire pour le réinitialiser');
		}

		return view('auth/reset-password', $data);
	}
	/**
	 * Traitement de reinitialisation du mot de passe
	 */
	public function processResetPassword()
	{
		if (null === $user = auth()->user()) {
			return redirect()->route('login');
		}
		
		if ($this->request->boolean('isMagicLogin')) {
			session()->setTempdata('magicLogin', true);
		}

		$post = $this->validate([
			'password'              => ['required', 'password'],
			'password_confirmation' => ['required', 'same:password']
		]);
		
		$user->setPassword($post['password']);
		$user->saveEmailIdentity();
		$user->undoForcePasswordReset();

		return redirect()->to('/');
	}
}
