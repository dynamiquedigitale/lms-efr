<?php

namespace App\Database\Migrations;

use App\Enums\Statut as S;
use BlitzPHP\Database\Migration\Migration;
use BlitzPHP\Database\Migration\Structure;

class CreateTableMeetings extends Migration
{
    protected string $group = 'default';

    public function up()
    {
        $this->create('meetings', function(Structure $table) {
			$table->id();
			$table->foreignId('parcour_id')->constrained();
			$table->foreignId('cour_id')->nullable()->constrained();
			$table->string('libelle', 128);
			$table->string('objectif');
			$table->unsignedInteger('quota_horaire')->nullable();
			$table->unsignedInteger('prix_horaire')->nullable();
			$table->dateTime('date_deb');
			$table->unsignedInteger('duree');
			$table->string('key');
			$table->enum('statut', [S::COMPLETED, S::IN_PROGRESS, S::EXPIRED, S::CANCELLED, S::SCHEDULED])->default(S::SCHEDULED);
            $table->timestamps();
			$table->softDeletes();
    
            return $table;
        });
    }

    public function down()
    {
        $this->dropIfExists('meetings');
    }
}
