<?php

namespace App\Entities;

use BlitzPHP\Wolke\Entity;
use BlitzPHP\Wolke\SoftDeletes;

abstract class AppEntity extends Entity
{
	public static function genereteRef(): string
	{
		$traits = class_uses(static::class);
		if (is_array($traits) && in_array(SoftDeletes::class, $traits, true)) {
			$count = static::withTrashed()->count();
		} else {
			$count = static::count();
		}

        return strtoupper(substr(last(explode('\\', static::class)), 0, 2)) . str_pad(++$count, 4, '0', STR_PAD_LEFT) . date('ym');
	}
}
