<?php

namespace App\Database\Migrations;

use App\Enums\Statut as S;
use BlitzPHP\Database\Migration\Migration;
use BlitzPHP\Database\Migration\Structure;

class CreateTableCours extends Migration
{
    protected string $group = 'default';

    public function up()
    {
        $this->create('cours', function(Structure $table) {
			$table->id();
			$table->foreignId('lecon_id')->constrained();
			$table->foreignId('parcour_id')->constrained();
			$table->unsignedInteger('rang')->default(1);
			$table->enum('statut', [S::COMPLETE, S::IN_PROGRESS, S::INACTIVE])->default(S::INACTIVE);
			$table->text('contenu');
            $table->timestamps();
			$table->softDeletes();
    
            return $table;
        });
    }

    public function down()
    {
        $this->dropIfExists('cours');
    }
}
