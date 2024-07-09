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

        $this->onMagicLogin($event);
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
