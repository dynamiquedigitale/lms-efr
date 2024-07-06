<?php

namespace App\Database\Migrations;

use BlitzPHP\Database\Migration\Migration;
use BlitzPHP\Database\Migration\Structure;

class CreateTableEnseignants extends Migration
{
    protected string $group = 'default';

    public function up()
    {
        $this->create('enseignants', function(Structure $table) {
			$table->foreignId('id')->primary()->constrained('users');
			$table->string('diplome', 64);
			$table->string('specialite', 32)->nullable();
			$table->string('piece_identite', 32)->nullable();
			$table->string('numero_identite', 40)->nullable();
			$table->string('pays_identite', 3)->nullable();
			$table->json('documents')->nullable();
			$table->unsignedInteger('taux_horaire')->default(0);
    
            return $table;
        });
    }

    public function down()
    {
        $this->dropIfExists('enseignants');
    }
}
