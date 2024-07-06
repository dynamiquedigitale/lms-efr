<?php

namespace App\Database\Migrations;

use BlitzPHP\Database\Migration\Migration;
use BlitzPHP\Database\Migration\Structure;

class CreateTableRessourcesParcours extends Migration
{
    protected string $group = 'default';

    public function up()
    {
        $this->create('ressources_parcours', function(Structure $table) {
            $table->id();
			$table->foreignId('ressource_id')->constrained();
			$table->foreignId('parcour_id')->constrained();
			$table->boolean('opened')->default(false)->comment('defini si l\'apprenant a deja consulter la ressource ou pas. utile pour pouvoir supprimer ou pas');
    
            return $table;
        });
    }

    public function down()
    {
        $this->dropIfExists('ressources_parcours');
    }
}
