<?php

namespace App\Database\Migrations;

use BlitzPHP\Database\Migration\Migration;
use BlitzPHP\Database\Migration\Structure;

class CreateTableLeconsFormations extends Migration
{
    protected string $group = 'default';

    public function up()
    {
        $this->create('lecons_formations', function(Structure $table) {
            $table->id();
			$table->foreignId('lecon_id')->constrained();
			$table->foreignId('formation_id')->constrained();
			$table->unsignedInteger('rang')->default(1);
    
            return $table;
        });
    }

    public function down()
    {
        $this->dropIfExists('lecons_formations');
    }
}
