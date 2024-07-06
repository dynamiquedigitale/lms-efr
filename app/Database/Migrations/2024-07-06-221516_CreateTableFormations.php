<?php

namespace App\Database\Migrations;

use BlitzPHP\Database\Migration\Migration;
use BlitzPHP\Database\Migration\Structure;

class CreateTableFormations extends Migration
{
    protected string $group = 'default';

    public function up()
    {
        $this->create('formations', function(Structure $table) {
			$table->id();
			$table->foreignId('created_by')->nullable()->constrained('users');
			$table->string('intitule', 128);
			$table->string('description');
			$table->text('objectif')->nullable();
			$table->enum('niveau', ['debutant', 'moyen', 'avance', 'expert']);
			$table->string('cover')->nullable();
            $table->timestamps();
			$table->softDeletes();
    
            return $table;
        });
    }

    public function down()
    {
        $this->dropIfExists('formations');
    }
}
