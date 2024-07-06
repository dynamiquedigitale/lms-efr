<?php

namespace App\Database\Migrations;

use BlitzPHP\Database\Migration\Migration;
use BlitzPHP\Database\Migration\Structure;

class AddColumnsToUsersTable extends Migration
{
    protected string $group = 'default';

    public function up()
    {
        $this->modify('users', function(Structure $table) {
			$table->string('matricule', 10);
			$table->string('nom', 64);
			$table->string('prenom', 64);
			$table->string('tel', 20);
			$table->enum('sexe', ['m', 'f', 'autre'])->nullable();
			$table->string('avatar')->nullable();
			$table->json('adresse')->nullable();

			return $table;
		});
    }

    public function down()
    {
        $this->modify('users', function(Structure $table) {
			$table->dropColumn(['matricule', 'nom', 'prenom', 'tel', 'sexe', 'avatar', 'adresse']);

			return $table;
		});
    }
}
