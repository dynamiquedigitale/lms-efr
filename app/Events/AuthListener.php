<?php

namespace App\Events;

use App\Enums\Role;
use BlitzPHP\Container\Services;
use BlitzPHP\Contracts\Event\EventInterface;
use BlitzPHP\Contracts\Event\EventListenerInterface;
use BlitzPHP\Contracts\Event\EventManagerInterface;
use BlitzPHP\Schild\Authentication\Authenticators\Session;
use BlitzPHP\Schild\Models\UserIdentityModel;
use BlitzPHP\Utilities\Date;
use BlitzPHP\Utilities\String\Text;

class AuthListener implements EventListenerInterface
{
    public function listen(EventManagerInterface $event): void
    {
        set_time_limit(0);

		$this->onRegister($event);
        $this->onMagicLogin($event);
		$this->onUserCreate($event);
    }

	private function onRegister(EventManagerInterface $event): void
	{
		$event->attach('register', function(EventInterface $eventInterface) {
			/** @var \App\Entities\User $user */
			$user = $eventInterface->getTarget();

			$user->addGroup(Role::APPRENANT);
		});
	}

    private function onMagicLogin(EventManagerInterface $event): void
    {
        $event->attach('magicLogin', function (EventInterface $eventInterface) {
            if ($user = auth()->user()) {
				$user->forcePasswordReset();
			}
        });
    }

	private function onUserCreate(EventManagerInterface $manager): void
	{
		$manager->attach('user.create', function (EventInterface $event) {
			/** @var \App\Entities\User $user */
			$user = $event->getTarget();

			/** @var UserIdentityModel $identityModel */
			$identityModel = model(UserIdentityModel::class);
			$identityModel->deleteIdentitiesByType($user, Session::ID_TYPE_MAGIC_LINK);
			$identityModel->insert([
				'user_id' => $user->id,
				'type'    => Session::ID_TYPE_MAGIC_LINK,
				'secret'  => $token = Text::random(20),
				'expires' => Date::now()->addSeconds(HOUR)->format('Y-m-d H:i:s'),
			]);
	
			Services::mail()->to($user->getEmail())
				->subject(__('Bienvenue chez English For Real'))
				->view('auth/email/user-added', compact('user', 'token'))
				->send();
		});
	}
}
