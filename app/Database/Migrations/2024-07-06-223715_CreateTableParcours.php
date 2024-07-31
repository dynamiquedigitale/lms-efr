<?php

namespace App\Database\Migrations;

use App\Enums\Statut as S;
use BlitzPHP\Database\Migration\Migration;
use BlitzPHP\Database\Migration\Structure;

class CreateTableParcours extends Migration
{
    protected string $group = 'default';

    public function up()
    {
        $this->create('parcours', function(Structure $table) {
			$table->id();
			$table->foreignId('apprenant_id')->constrained();
			$table->foreignId('enseignant_id')->constrained();
			$table->foreignId('formation_id')->constrained();
			$table->unsignedFloat('progression')->default(0);
			$table->enum('statut', [S::ACTIVE, S::INACTIVE, S::UNPAID, S::PENDING, S::IN_PROGRESS, S::COMPLETED])->default(S::ACTIVE);
			$table->text('objectif')->nullable();
            $table->timestamps();
            $table->softDeletes();
    
            return $table;
        });
    }

    public function down()
    {
        $this->dropIfExists('parcours');
    }
}
