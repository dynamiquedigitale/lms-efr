<template>
	<page-wrapper :title="$t('liste_des_parcours')" :breadcrumb="[$t('parcours.title')]">
		<b-row>
			<b-col lg="3" sm="6">
				<b-card body-class="d-flex align-items-center justify-content-between">
					<div>
						<h3 class="fw-bolder mb-75">21,459</h3>
						<span>{{ $t('parcours.en_cours') }}</span>
					</div>
					<div class="avatar bg-light-primary p-50">
						<span class="avatar-content">
							<app-icon name="briefcase" class="font-medium-4" />
						</span>
					</div>
				</b-card>
			</b-col>
			<b-col lg="3" sm="6">
				<b-card body-class="d-flex align-items-center justify-content-between">
					<div>
						<h3 class="fw-bolder mb-75">21,459</h3>
						<span>{{ $t('parcours.termines') }}</span>
					</div>
					<div class="avatar bg-light-primary p-50">
						<span class="avatar-content">
							<app-icon name="book-open" class="font-medium-4" />
						</span>
					</div>
				</b-card>
			</b-col>
			<b-col lg="3" sm="6">
				<b-card body-class="d-flex align-items-center justify-content-between">
					<div>
						<h3 class="fw-bolder mb-75">21,459</h3>
						<span>{{ $t('parcours.non_payer') }}</span>
					</div>
					<div class="avatar bg-light-primary p-50">
						<span class="avatar-content">
							<app-icon name="codepen" class="font-medium-4" />
						</span>
					</div>
				</b-card>
			</b-col>
			<b-col lg="3" sm="6">
				<b-card body-class="d-flex align-items-center justify-content-between">
					<div>
						<h3 class="fw-bolder mb-75">21,459</h3>
						<span>{{ $t('parcours.termines') }}</span>
					</div>
					<div class="avatar bg-light-primary p-50">
						<span class="avatar-content">
							<app-icon name="book-open" class="font-medium-4" />
						</span>
					</div>
				</b-card>
			</b-col>
		</b-row>
		<b-card no-body class="my-2">
			<b-card-header class="d-flex flex-wrap justify-content-between">
				<b-row class="w-75">
					<b-col cols="2">
						<app-select v-model="filter.limit" @update:model-value="(v) => { findItems(v) }" :options="[10, 20, 30, 50]" />
					</b-col>
					<b-col cols="3">
						<app-select 
							v-model="filter.filter" 
							@update:model-value="findItems()" 
							:options="[
								{ text: $t('filtre.all'), value: 'all' },
								{ text: $t('parcours.en_cours'), value: 'en_cours' },
								{ text: $t('parcours.non_payer'), value: 'non_payer' },
								{ text: $t('parcours.termines'), value: 'termines' },
							]" 
						/>
					</b-col>
					<b-col cols="7">
						<app-input-search v-model="filter.search" @keyup="findItems()" />
					</b-col>
				</b-row>
				<app-button class="mt-1 mt-md-0" :text="$t('nouveau_parcours')" icon="plus" @click.prevent="addParcours" />
			</b-card-header>
			<b-card-body>
				<app-empty-items v-if="!parcours.total" :message="$t('aucun_parcours_enregistre')" />
				<div v-else class="card-datatable table-responsive mb-3 pt-0 border-0 overflow-y-hidden">
					<table class="table mb-0 text-nowrap">
						<thead class="table-light">
							<tr>
								<th scope="col" class="border-0">{{ $t('formations.title', 1) }}</th>
								<th scope="col" class="border-0">{{ $t('apprenants.title', 1) }}</th>
								<th scope="col" class="border-0">{{ $t('enseignants.title', 1) }}</th>
								<th scope="col" class="border-0">{{ $t('statut.title') }}</th>
								<th scope="col" class="border-0"></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="{ id, cours_count, progression, statut, apprenant, enseignant, formation } in items" :key="id">
								<td>
									<div class="d-lg-flex">
										<a href="#">
											<img :src="formation.cover_url" alt="" width="60" height="60" class="rounded">
										</a>
										<div class="ms-lg-1 mt-2 mt-lg-0">
											<h4 class="mb-1 h5">
												<a href="#" class="text-inherit text-truncate">{{ formation.intitule }}</a>
											</h4>
											<ul class="list-inline fs-6 mb-0">
												<li class="list-inline-item">
													<app-icon name="book-open" class="me-1" />
													<b>{{ cours_count }}</b> {{ $t('lecons.title', cours_count).toLowerCase() }}
												</li>
												<li class="list-inline-item">
													<app-icon name="bar-chart" class="me-1" /> 
													{{ $t(`difficulte.${formation.niveau}`) }}
												</li>
											</ul>
										</div>
									</div>
								</td>
								<td>
									<div class="d-lg-flex">
										<a href="#">
											<img :src="apprenant.avatar" alt="" width="60" height="60" class="rounded">
										</a>
										<div class="ms-lg-1 mt-2 mt-lg-0">
											<h4 class="mb-1 h5">
												<a href="#" class="text-inherit text-truncate">{{ apprenant.username }}</a>
											</h4>
											<ul class="list-inline fs-6 mb-0">
												<li class="list-inline-item">{{ apprenant.user_email }}</li>
											</ul>
										</div>
									</div>
								</td>
								<td>
									<div class="d-lg-flex">
										<a href="#">
											<img :src="enseignant.avatar" alt="" width="60" height="60" class="rounded">
										</a>
										<div class="ms-lg-1 mt-2 mt-lg-0">
											<h4 class="mb-1 h5">
												<a href="#" class="text-inherit text-truncate">{{ enseignant.username }}</a>
											</h4>
											<ul class="list-inline fs-6 mb-0">
												<li class="list-inline-item">{{ enseignant.user_email }}</li>
											</ul>
										</div>
									</div>
								</td>
								<td>
									<b-progress class="mb-1" :value="progression" :variant="$percentageVariant(progression)" />
									<span :class="`w-100 badge bg-${$statusVariant(statut)}`">{{ $t(`statut.${statut}`) }}</span>
								</td>
								<td>
									<app-button icon="eye" :title="$t('details')" tooltip variant="flat-primary" @click="showParcours(id)" />
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<app-pagination 
					v-if="parcours.total"
					v-model="filter.limit"
					:links="parcours.links"
					:prev="parcours.prev_page_url"
					:next="parcours.next_page_url"
					:total="parcours.total"
					:from="parcours.from"
					:to="parcours.to"
				/>
			</b-card-body>
		</b-card>
	</page-wrapper>

	<app-modal id="parcours-dialog" v-model="openDialog" :title="modalTitle" :size="action == 'details' ? 'xl' : 'md'" no-footer @close="closeDialog">
		<form-parcours v-if="openDialog && action != 'details'" :action="action" :item="item" @reset="closeDialog" @completed="closeDialog" />
		<details-parcours v-else-if="openDialog && action == 'details'" :parcours="item" />
	</app-modal>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

// import DetailsParcours from './Details.vue'
import FormParcours from './Form.vue'

import { $alert, $confirm, $toast } from '@/utils/alert'
import { $t } from '@/plugins/i18n'
import { handleSearch } from '@/utils/inertia'
import { Inertia } from '@inertiajs/inertia'

defineOptions({ name: 'AdminListParcours' })

const props = defineProps({
  	parcours: { required: true, type: Object },
})

const openDialog = ref(false)
// const loading = ref(true)
const action = ref(null)
const item = ref(null) // Element en cours de manipulation (notament pour l'edition)
// const itemId = ref(null) // Id de l'element en cours de manipulation (notament pour l'edition)

const filter = reactive({
	filter: 'all',
	limit: 20,
	search: '',
})

const items = computed(() => props.parcours.data) // Liste de tous les elements (parcours)

const modalTitle = computed(() => {
    switch (action.value) {
        case 'create':
            return $t('nouveau_parcours')
        case 'edit':
            return $t('edition_de_la_lecon')
        default:
            return $t('details_du_parcours')
    }
})

/**
 * Ouvre le formulaire d'ajout d'un parcours
 */
function addParcours() {
    action.value     = 'create'
    openDialog.value = true
}


/**
 * Ouvre la modale de details de la lecon
 */
function showParcours(id) {
	action.value     = 'details'
	item.value       = items.value.find(e => e.id == id)
	openDialog.value = true
}

/**
 * Supprime une lecon
 */
function deleteLecon(lecon) {
	$confirm($t('voulez_vous_vraiment_supprimer_la_lecon_x', [lecon.intitule]), () => {
		// eslint-disable-next-line no-undef
		Inertia.delete(route('admin.lecons.delete', lecon.id), {}, {
			onError(errors) {
				if (errors.default) {
					$alert.error(errors.default)
				} else {
					$alert.error($t('une_erreur_s_est_produite'))
				}
			},
			onSuccess({ props }) {
				$toast.success(props.flash.success)
			},
		})
	}, { showLoaderOnConfirm: true })
}

/**
 * Provoque la fermeture de la modale
 */
 function closeDialog() {
    openDialog.value = false
    item.value = null
    action.value = null
}
/**
 * Lorsque la modale est effectivement fermee
 */
function onCloseDialog() {
    if (action.value === 'details') {
        // refresh()
    }
}

function findItems(limit){
	handleSearch('admin.parcours.index', {
		filter: filter.filter,
		limit : limit || filter.limit,
		search: filter.search,
	})
}
</script>
