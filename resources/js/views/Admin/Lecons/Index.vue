<template>
	<page-wrapper :title="$t('liste_des_lecons')" :breadcrumb="[$t('lecons.title')]">
		<b-card no-body class="mb-4">
			<b-card-header class="d-flex flex-wrap justify-content-between">
				<b-row class="w-auto">
					<b-col cols="4">
						<app-select v-model="filter.limit" @update:model-value="(v) => { findItems(v) }" :options="[10, 20, 30, 50]" />
					</b-col>
					<b-col cols="8">
						<app-input-search v-model="filter.search" @keyup="findItems()" />
					</b-col>
				</b-row>
				<app-button class="mt-1 mt-md-0" :text="$t('ajouter_une_lecon')" icon="plus" @click.prevent="addLecon" />
			</b-card-header>

			<b-card-body>
				<app-empty-items v-if="!lecons.total" :message="$t('aucune_lecon_enregistree')" />
				<template v-else>
					<b-row class="gy-4 mb-4">
						<b-col cols="12" lg="4" v-for="lecon in items" :key="lecon.id">
							<b-card class="border">
								<div class="d-flex justify-content-center">
									<div class="avatar bg-light-primary avatar-xl">
										<span class="avatar-content" @click.prevent="showLecon(lecon)">{{ lecon.abbr }}</span>
									</div>
								</div>
								<div class="my-1">
									<h4 class="fw-bold text-center" style="height: 2.5em">
										<a href="#" class="text-inherit" @click.prevent="showLecon(lecon)">{{ lecon.intitule }}</a>
									</h4>
									<div class="p-1 bg-light rounded-3 my-2" style="height: 5em">
										<p class="fs-6">{{ lecon.description }}</p>
									</div>
									<ul class="list-unstyled">
										<li class="mb-75 d-flex justify-content-between">
										  <span class="fw-bolder me-25">{{ $t('utilisee_dans') }}:</span>
										  <span><b>{{ lecon.formations_count }}</b> {{ $t('formations.title').toLowerCase() }}</span>
										</li>
								  	</ul>
									  <div class="mt-3 d-flex justify-content-center">
										<app-button :text="$t('details')" variant="outline-primary" @click.prevent="showLecon(lecon)" />
										<div class="dropdown ms-1">
											<app-button variant="light" icon="more-horizontal" class="btn-icon btn-wave" data-bs-toggle="dropdown" text="" />
											<div class="dropdown-menu dropdown-menu-end">
												<a class="dropdown-item" href="#" @click.prevent="editLecon(lecon)">
													<app-icon name="edit" class="align-middle me-50" />
													<span class="align-middle">{{ $t('action.modifier') }}</span>
												</a>
												<a class="dropdown-item text-danger" href="#" @click.prevent="deleteLecon(lecon)">
													<app-icon name="trash" class="align-middle me-50" />
													<span class="align-middle">{{ $t('action.supprimer') }}</span>
												</a>
											</div>
										</div>
									</div>
								</div>
							</b-card>
						</b-col>
					</b-row>
					  
					<app-pagination 
						v-model="filter.limit"
						:links="lecons.links"
						:prev="lecons.prev_page_url"
						:next="lecons.next_page_url"
						:total="lecons.total"
						:from="lecons.from"
						:to="lecons.to"
					/>
				</template>
			</b-card-body>
		</b-card>
	</page-wrapper>

	<app-modal id="user-dialog" v-model="openDialog" :title="modalTitle" :size="action === 'details' ? 'lg' : 'md'" no-footer @close="onCloseDialog">
		<form-lecon v-if="openDialog && action != 'details'" :action="action" :item="item" @reset="closeDialog" @completed="closeDialog" />
		<details-lecon v-else-if="openDialog && action == 'details'" :lecon="item" />
	</app-modal>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

import DetailsLecon from './Details.vue'
import FormLecon from './Form.vue'

import { $alert, $confirm, $toast } from '@/utils/alert'
import { $t } from '@/plugins/i18n'
import { handleSearch } from '@/utils/inertia'
import { Inertia } from '@inertiajs/inertia'

defineOptions({ name: 'AdminListLecons' })

const props = defineProps({
  	lecons: { required: true, type: Object },
})

const openDialog = ref(false)
// const loading = ref(true)
const action = ref(null)
const item = ref(null) // Element en cours de manipulation (notament pour l'edition)
// const itemId = ref(null) // Id de l'element en cours de manipulation (notament pour l'edition)

const filter = reactive({
	limit: 20,
	search: '',
})

const items = computed(() => props.lecons.data) // Liste de tous les elements (lecons)

const modalTitle = computed(() => {
    switch (action.value) {
        case 'create':
            return $t('ajouter_une_lecon')
        case 'edit':
            return $t('edition_de_la_lecon')
        default:
            return (item.value || {}).intitule || ''
    }
})

/**
 * Ouvre le formulaire d'ajout d'une lecon
 */
function addLecon() {
    action.value     = 'create'
    openDialog.value = true
}

/**
 * Ouvre le formulaire d'edition d'une lecon
 */
function editLecon(lecon) {
	action.value     = 'edit'
	item.value       = lecon
	openDialog.value = true
}

/**
 * Ouvre la modale de details de la lecon
 */
function showLecon(lecon) {
	action.value     = 'details'
	item.value       = lecon
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
	handleSearch('admin.lecons.index', {
		limit: limit || filter.limit,
		search: filter.search,
	})
}
</script>
