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
			$table->string('nom');
			$table->enum('type', ['image', 'video', 'audio', 'doc', 'other']);
			$table->string('url');
			$table->string('description');
			$table->string('ext', 8);
			$table->string('mime', 128);
			$table->unsignedInteger('size');
			$table->string('sizeText', 15);
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
