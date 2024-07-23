<?php

namespace App\Database\Migrations;

use BlitzPHP\Database\Migration\Migration;
use BlitzPHP\Database\Migration\Structure;

class CreateTableLecons extends Migration
{
    protected string $group = 'default';

    public function up()
    {
        $this->create('lecons', function(Structure $table) {
			$table->id();
			$table->string('intitule', 128);
			$table->string('description')->nullable();
			$table->text('resume')->nullable();
            $table->timestamps();
			$table->softDeletes();
    
            return $table;
        });
    }

    public function down()
    {
        $this->dropIfExists('lecons');
    }
}
