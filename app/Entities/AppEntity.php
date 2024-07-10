<?php

namespace App\Entities;

use BlitzPHP\Wolke\Entity;
use BlitzPHP\Wolke\SoftDeletes;

abstract class AppEntity extends Entity
{
	public static function generateRef(?string $entity = null, ?string $prefix = null): string
	{
		$entity ??= static::class;
		$prefix ??= static::class;

		$traits = class_uses($entity);
		if (is_array($traits) && in_array(SoftDeletes::class, $traits, true)) {
			$count = $entity::withTrashed()->count();
		} else {
			$count = $entity::count();
		}

        return strtoupper(substr(last(explode('\\', $prefix)), 0, 2)) . str_pad(++$count, 4, '0', STR_PAD_LEFT) . date('ym');
	}
}
