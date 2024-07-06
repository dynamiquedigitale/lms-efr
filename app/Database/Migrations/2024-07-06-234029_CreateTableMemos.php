<?php

namespace App\Database\Migrations;

use BlitzPHP\Database\Migration\Migration;
use BlitzPHP\Database\Migration\Structure;

class CreateTableMemos extends Migration
{
    protected string $group = 'default';

    public function up()
    {
        $this->create('memos', function(Structure $table) {
			$table->id();
			$table->foreignId('meeting_id')->constrained();
			$table->text('descriptif')->nullable();
			$table->json('communication_orale')->nullable();
			$table->json('vocabulary_box')->nullable();
			$table->json('utilisation_anglais_general')->nullable();
			$table->json('conjugaison')->nullable();
			$table->json('liste_contractions')->nullable();
			$table->json('exercices_ecoute')->nullable();
			$table->json('musculation_langue')->nullable();
			$table->json('exemple_prononciation')->nullable();
			$table->json('wh_questions')->nullable();
			$table->json('grammar_focus')->nullable();
			$table->json('possessifs_anglais')->nullable();
			$table->json('sujets')->nullable();
            $table->timestamps();
			$table->softDeletes();
    
            return $table;
        });
    }

    public function down()
    {
        $this->dropIfExists('memos');
    }
}
