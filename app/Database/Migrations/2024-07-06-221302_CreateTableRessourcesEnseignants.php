<?php

namespace App\Database\Migrations;

use BlitzPHP\Database\Migration\Migration;
use BlitzPHP\Database\Migration\Structure;

class CreateTableRessourcesEnseignants extends Migration
{
    protected string $group = 'default';

    public function up()
    {
        $this->create('ressources_enseignants', function(Structure $table) {
			$table->id();
			$table->foreignId('ressource_id')->constrained();
			$table->foreignId('enseignant_id')->constrained();
			$table->boolean('opened')->default(false)->comment('defini si l\'enseignant a deja consulter la ressource ou pas. utile pour pouvoir supprimer ou pas');
            
            return $table;
        });
    }

    public function down()
    {
        $this->dropIfExists('ressources_enseignants');
    }
}
