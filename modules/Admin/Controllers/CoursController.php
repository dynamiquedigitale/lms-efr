<?php

namespace App\Admin\Controllers;

use App\Controllers\AppController;
use App\Entities\Cours;
use App\Enums\Statut;
use BlitzPHP\Contracts\Http\StatusCode;
use BlitzPHP\Exceptions\ValidationException;
use BlitzPHP\Validation\Rule;

class CoursController extends AppController
{
	public function update($id = null)
	{
		try {
            $post = $this->validate([
				'contenu' => ['nullable', 'string'],
				'statut'  => ['nullable', Rule::in([Statut::INACTIVE, Statut::IN_PROGRESS, Statut::COMPLETE])],
            ]);
        }
        catch (ValidationException $e) {
			return $this->response->json(['errors' => $e->getErrors()?->firstOfAll() ?: $e->getMessage()], StatusCode::BAD_REQUEST);
		}
		/** @var Cours $cours */
		if (empty($cours = Cours::find($id))) {
			return $this->response->json(['errors' => ['default' => __('Cours non reconnu')]], StatusCode::NOT_FOUND);
		}

		$cours->update(array_filter($post->all()));
		
		return $this->response->json(['message' => __('Cours édité avec succès')]);
	}

	public function delete($id = null)
	{
		/** @var Cours $cours */
		if (empty($cours = Cours::find($id))) {
			return $this->response->json(['errors' => ['default' => __('Cours non reconnu')]], StatusCode::NOT_FOUND);
		}

		$cours->delete();

		return $this->response->json(['message' => __('Cours supprimé avec succès')]);
	}

	/**
	 * Liste des cours d'un parcours
	 * 
	 * @param int $id Id du parcours
	 */
	public function parcours($id)
	{
		return Cours::with('lecon')
			->where('parcour_id', $id)
			->sortAsc(['rang', 'created_at'])
			->get();
	}

	/**
	 * Reorganisation des cours d'un parcours 
	 * 
	 * @param int $id Id du parcours
	 */
	public function sort($id)
	{
		try {
            $post = $this->validate([
				'cours'   => ['required', 'array'],
				'cours.*' => ['integer', Rule::exists('cours', 'id')->where('parcour_id', $id)],
			]);
        }
        catch (ValidationException $e) {
			return $this->response->json(['errors' => $e->getErrors()?->firstOfAll() ?: $e->getMessage()], StatusCode::BAD_REQUEST);
		}

		/** @var \BlitzPHP\Database\Connection\BaseConnection $db */
		$db = service('database');	
		try {
			$db->beginTransaction();

			foreach ($post['cours'] as $k => $v) {
				$db->table('cours')->where(['id' => $v, 'parcour_id' => $id])->update(['rang' => $k + 1]);		
			}

			$db->commit();
		} catch (\Throwable $e) {
			$db->rollback();
			return $this->response->json(['errors' =>  $e->getMessage()], StatusCode::INTERNAL_ERROR);
		}

		return $this->response->json(['message' => 'Ok']);
	}
}
