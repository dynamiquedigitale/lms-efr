<?php

namespace App\Database\Migrations;

use App\Enums\Role;
use App\Enums\Statut as S;
use BlitzPHP\Database\Migration\Migration;
use BlitzPHP\Database\Migration\Structure;

class MergeUsersTables extends Migration
{
    protected string $group = 'default';

    public function up()
    {
        $this->dropIfExists('apprenants');
        $this->dropIfExists('enseignants');

		$this->modify('users', function(Structure $table) {
			$table->enum('type', [Role::ADMIN, Role::APPRENANT, Role::ENSEIGNANT])->default(Role::APPRENANT);
			
			// enseignant
			$table->string('diplome', 64)->nullable();
			$table->string('specialite', 32)->nullable();
			$table->string('piece_identite', 32)->nullable();
			$table->string('numero_identite', 40)->nullable();
			$table->string('pays_identite', 3)->nullable();
			$table->json('documents')->nullable();
			$table->unsignedInteger('taux_horaire')->default(0);

			// apprenant
			$table->foreignId('encardrant_id')->nullable()->constrained('users');
			$table->foreignId('created_by')->nullable()->constrained('users');
			$table->date('date_naiss')->nullable();
			$table->enum('statut_compte', [S::ACTIVE, S::INCOMPLETE, S::PENDING, S::INACTIVE, S::BLOCKED])->default(S::ACTIVE);
    
			return $table;
		});
    }

    public function down()
    {
        $this->modify('users', function(Structure $table) {
			$table->dropColumn([
				'diplome', 'specialite', 'piece_identite', 'numero_identite', 'pays_identite', 'documents', 'taux_horaire',
				'date_naiss', 'statut_compte',			
			]);

			$table->dropConstrainedForeignId('encardrant_id');
			$table->dropConstrainedForeignId('created_by');

			return $table;
		});
    }
}
