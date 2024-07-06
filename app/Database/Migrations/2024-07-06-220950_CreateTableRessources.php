<?php

namespace App\Database\Migrations;

use BlitzPHP\Database\Migration\Migration;
use BlitzPHP\Database\Migration\Structure;

class CreateTableRessources extends Migration
{
    protected string $group = 'default';

    public function up()
    {
        $this->create('ressources', function(Structure $table) {
            $table->id();
			$table->string('libelle', 128);
			$table->enum('type', ['pdf', 'image', 'video', 'audio', 'ppt', 'text', 'doc']);
			$table->string('url');
			$table->string('description');
            $table->timestamps();
			$table->softDeletes();
    
            return $table;
        });
    }

    public function down()
    {
        $this->dropIfExists('ressources');
    }
}
