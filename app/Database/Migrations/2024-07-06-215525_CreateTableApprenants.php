<?php

namespace App\Database\Migrations;

use App\Enums\Statut as S;
use BlitzPHP\Database\Migration\Migration;
use BlitzPHP\Database\Migration\Structure;

class CreateTableApprenants extends Migration
{
    protected string $group = 'default';

    public function up()
    {
        $this->create('apprenants', function(Structure $table) {
			$table->foreignId('id')->primary()->constrained('users');
			$table->foreignId('enseignant_id')->nullable()->constrained();
			$table->foreignId('created_by')->nullable()->constrained('users');
			$table->date('date_naiss')->nullable();
			$table->enum('statut', [S::ACTIVE, S::INCOMPLETE, S::PENDING, S::INACTIVE, S::BLOCKED])->default(S::ACTIVE);
    
            return $table;
        });
    }

    public function down()
    {
        $this->dropIfExists('apprenants');
    }
}
