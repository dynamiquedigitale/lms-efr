<?php

namespace App\Events;

use BlitzPHP\Contracts\Event\EventInterface;
use BlitzPHP\Contracts\Event\EventListenerInterface;
use BlitzPHP\Contracts\Event\EventManagerInterface;

class AuthListener implements EventListenerInterface
{
    public function listen(EventManagerInterface $event): void
    {
        set_time_limit(0);

		$this->onRegister($event);
        $this->onMagicLogin($event);
    }

	private function onRegister(EventManagerInterface $event): void
	{
		$event->attach('register', function(EventInterface $eventInterface) {
			/** @var \App\Entities\User $user */
			$user = $eventInterface->getTarget();

			$user->addGroup('apprenant');
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
}
