<template>
    <b-row>
		<b-col xl="4" lg="5" md="5" order="1" order-md="0">
			<b-card>
				<div class="user-avatar-section">
					<div class="d-flex align-items-center flex-column">
						<b-img :src="enseignant.avatar" rounded fluid class="mt-3 mb-2" height="110" width="110" :alt="enseignant.username" />
					  	<div class="user-info text-center">
							<h4>{{ enseignant.username }}</h4>
							<span class="badge bg-light-secondary">{{ enseignant.matricule }}</span>
					 	</div>
					</div>
				</div>
				<div class="d-flex justify-content-around my-2 pt-75">
					<div class="d-flex align-items-start">
					  	<span class="badge bg-light-primary p-75 rounded">
							<app-icon name="briefcase" class="font-medium-2" />
					  	</span>
					  	<div class="ms-75">
							<h4 class="mb-0">{{ enseignant.parcours_count }}</h4>
							<small>{{ $t('formations.title') }}</small>
					  	</div>
					</div>
					<div class="d-flex align-items-start me-2">
						<span class="badge bg-light-primary p-75 rounded">
						  <app-icon name="check" class="font-medium-2" />
						</span>
						<div class="ms-75">
						  <h4 class="mb-0">{{ enseignant.ressources_count }}</h4>
						  <small>{{ $t('ressources.title') }}</small>
						</div>
				  	</div>
				</div>
				<h4 class="fw-bolder border-bottom pb-50 mb-1">{{ $t('details') }}</h4>
				<div class="info-container">
					<ul class="list-unstyled">
					  	<li class="mb-75">
							<span class="fw-bolder me-25">{{ $t('email.title') }}:</span>
							<span>{{ enseignant.user_email }}</span>
					  	</li>
					  	<li class="mb-75">
							<span class="fw-bolder me-25">{{ $t('tel.title') }}:</span>
							<span>{{ enseignant.tel }}</span>
					  	</li>
					  	<li class="mb-75">
							<span class="fw-bolder me-25">{{ $t('statut.title') }}:</span>
							<span class="badge bg-light-success">{{ $t(`statut.${enseignant.statut_compte}`) }}</span>
						</li>
					  	<li class="mb-75">
							<span class="fw-bolder me-25">{{ $t(`numero_identite.${enseignant.piece_identite}`) }}:</span>
							<span>{{ enseignant.numero_identite }}</span>
					  	</li>
					  	<li class="mb-75">
							<span class="fw-bolder me-25">{{ $t('sexe.title') }}:</span>
							<span>{{ $t(`sexe.${enseignant.sexe}`)}}</span>
					  	</li>
					  	<li class="mb-75">
							<span class="fw-bolder me-25">{{ $t('lieu_residence.title') }}:</span>
							<span>{{ enseignant.lieu_residence }}</span>
					  	</li>
					</ul>
				</div>
				<h4 class="fw-bolder border-bottom pb-50 mb-1 mt-2">{{ $t('autres_infos') }}</h4>
				<div class="info-container">
					<ul class="list-unstyled">
					  	<li class="mb-75">
							<span class="fw-bolder me-25">{{ $t('diplome.title') }}:</span>
							<span>{{ $t(`diplome.${enseignant.diplome}`) }}</span>
					  	</li>
					  	<li class="mb-75">
							<span class="fw-bolder me-25">{{ $t('specialite') }}:</span>
							<span>{{ enseignant.specialite }}</span>
					  	</li>
					  	<li class="mb-75">
							<span class="fw-bolder me-25">{{ $t('taux_horaire.title') }}:</span>
							<span>{{ enseignant.taux_horaire }}h</span>
						</li>
					</ul>
				</div>
			</b-card>
			
			<!-- <b-card class="border-primary">
				<div class="d-flex justify-content-between align-items-start">
					<span class="badge bg-light-primary">Standard</span>
					<div class="d-flex justify-content-center">
					  	<sup class="h5 pricing-currency text-primary mt-1 mb-0">$</sup>
					  	<span class="fw-bolder display-5 mb-0 text-primary">99</span>
					  	<sub class="pricing-duration font-small-4 ms-25 mt-auto mb-2">/month</sub>
					</div>
				</div>
				<ul class="ps-1 mb-2">
					<li class="mb-50">10 Users</li>
					<li class="mb-50">Up to 10 GB storage</li>
					<li>Basic Support</li>
				</ul>
				<div class="d-flex justify-content-between align-items-center fw-bolder mb-50">
					<span>Days</span>
					<span>4 of 30 Days</span>
				</div>
				<b-progress class="mb-50" value="80" style="height: 8px" />
				<span>4 days remaining</span>
				<div class="d-grid w-100 mt-2">
					<app-button text="Upgrade Plan" variant="primary" class="waves-effect waves-float waves-light" />
				</div>
			</b-card> -->
		</b-col>
		
		<b-col xl="8" lg="7" md="7" order="0" order-md="1">
			<b-nav pills class="mb-2">
				<b-nav-item v-for="({ icon, key, title }) in tabs" :key="key" :active="activeTab == key" @click.prevent="changeTab(key)">
					<app-icon :name="icon" />
					<span class="fw-bold">{{ title }}</span>
				</b-nav-item>
			</b-nav>

			<b-overlay :show="proceeding" rounded="sm">
				<b-card no-body>
					<b-card-header class="row">
						<b-col md="7"></b-col>
						<b-col md="5">
							<div class="d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0">
								<app-input-search v-model="search[activeTab]" class="me-1" />
								<app-button :text="addBtnTooltip" :disabled="addBtnDisabled" icon="plus" :tooltip="{placement: 'bottom'}" @click.prevent="doAdd" />
							</div>
						</b-col>
					</b-card-header>
					
					<b-card-body class="border-top pt-1" v-if="activeTab === 'formations'">
						<div class="card-datatable table-responsive mb-3 pt-0 border-0 overflow-y-hidden">
							<table class="table mb-0 text-nowrap">
								<thead class="table-light">
									<tr>
										<th scope="col" class="border-0"></th>
										<th scope="col" class="border-0">{{ $t('formations.title', 1) }}</th>
										<th scope="col" class="border-0">{{ $t('apprenants.title', 1) }}</th>
										<th scope="col" class="border-0">{{ $t('statut.title') }}</th>
										<th scope="col" class="border-0"></th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="({ id, cours_count, progression, statut, apprenant, formation }, i) in showableParcours" :key="id">
										<td>#{{ i + 1 }}</td>
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
											<b-progress class="mb-1" :value="progression" :variant="$percentageVariant(progression)" />
											<span :class="`w-100 badge bg-${$statusVariant(statut)}`">{{ $t(`statut.${statut}`) }}</span>
										</td>
										<td>
											<app-button icon="eye" :title="$t('details')" tooltip variant="flat-primary" />
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</b-card-body>

					<b-card-body class="border-top pt-1" v-if="activeTab === 'ressources'">
						<b-row>
							<b-col lg="6" sm="12" v-for="ressource in showableRessources" :key="ressource.id">
								<b-card class="card-transaction border p-0" body-class="p-1">
									<div class="float-end">
										<app-button size="sm" variant="flat-secondary" icon="more-horizontal" text="" class="py-0 waves-effect waves-float waves-light" data-bs-toggle="dropdown" />
										<div class="dropdown-menu dropdown-menu-end file-dropdown">
											<a class="dropdown-item" href="#" @click.prevent="showRessource(ressource)">
												<app-icon name="info" class="align-middle me-50" />
												<span class="align-middle">Info</span>
											</a>
											<a class="dropdown-item text-danger" href="#" @click.prevent="removeRessource(ressource)">
												<app-icon name="trash" class="align-middle me-50" />
												<span class="align-middle">{{ $t('action.retirer') }}</span>
											</a>
										</div>
									</div>
									<div class="transaction-item">
										<div class="d-flex flex-row align-items-start">
										  	<div class="avatar bg-light-primary rounded">
												<a class="avatar-content" :href="`#${ressource.nom}`" @click.prevent="showRessource(ressource)">
													<img :src="$asset(`img/icons/${ressource.ext}.png`)" :alt="ressource.ext" height="35" />
												</a>
										  	</div>
										  	<div class="transaction-info">
												<h6 class="transaction-title mb-1" style="height: 3em">
													<a class="text-inherit" :href="`#${ressource.nom}`" @click.prevent="showRessource(ressource)">{{ ressource.nom }}</a>
												</h6>
												<small>{{ ressource.sizeText }}</small>
										  	</div>
										</div>
									</div>
								</b-card>
							</b-col>
						</b-row>
					</b-card-body>
				</b-card>
			</b-overlay>
		</b-col>
	</b-row>

	<b-modal v-model="openRessource" id="app-file-manager-info-sidebar" class="modal-slide-in" hide-footer no-close-on-esc dialog-class="sidebar-lg" content-class="p-0" header-class="d-flex align-items-center justify-content-between mb-1 p-1" body-class="flex-grow-1 pb-sm-0 pb-1" @close="item = null">
		<template #header="{ close }">
			<h5 class="modal-title text-truncate">{{ (item || {}).nom }}</h5>
			<div class="d-flex ms-1">
				<app-button size="sm" variant="flat-secondary" icon="more-horizontal" text="" class="waves-effect waves-float waves-light" data-bs-toggle="dropdown" />
				<div class="dropdown-menu dropdown-menu-end file-dropdown">
					<a class="dropdown-item text-danger" href="#" @click.prevent="removeRessource(item)">
						<app-icon name="trash" class="align-middle me-50" />
						<span class="align-middle">{{ $t('action.retirer') }}</span>
					</a>
				</div>
				<app-button size="sm" variant="flat-secondary" icon="x" text="" @click.prevent="close" />
			</div>
		</template>
		<details-ressource v-if="openRessource" :ressource="item" readonly />
	</b-modal>

	<app-modal id="add-ressources" v-model="openAddRessource" :title="$t('ressources.attribuer_a_l_enseignant', [enseignant.username])" size="lg" @ok.prevent="processAddRessource" :disabled="!availableRessources.length" :submitted="submitted">
		<b-alert :model-value="true" variant="primary">
			<div class="alert-body text-center">
				{{ $t('veuillez_selectionner_les_ressources_que_vous_souhaitez_attribuer_a_cet_enseignant') }}
			</div>
		</b-alert>
		<b-overlay :show="proceeding" rounded="sm" :opacity="0.95">
			<app-empty-items v-if="!availableRessources.length" :message="$t('aucun_enseignant_disponible_pour_etre_affecter_a_cette_ressource')" />
			<b-row class="custom-options-checkable g-1 mt-2">
				<b-col cols="12" md="6" v-for="ressource in availableRessources" :key="ressource.id">
					<input v-model="checkedRessources" class="custom-option-item-check" type="checkbox" name="ressources" :value="ressource.id" :id="`ressource${ressource.id}`" />
					<label class="custom-option-item p-1" :for="`ressource${ressource.id}`">
						<div class="d-flex align-items-start">
							<span class="avatar">
								<b-img class="round" :src="$asset(`img/icons/${ressource.ext}.png`)" :alt="ressource.ext" height="40" width="40" />
							</span>
							<div class="ms-1">
								<h5 class="mb-0 w-100 d-inline-block" style="height: 3.5em">{{ ressource.nom }}</h5>
								<small class="mb-1 d-inline-block text-muted w-100">{{ ressource.sizeText }}</small>
								<span class="badge bg-primary"><b>{{ ressource.enseignants_count }}</b> {{ $t('enseignants').toLowerCase() }}</span>
							</div>
						</div>
					</label>
				</b-col>
			</b-row>
		</b-overlay>
	</app-modal>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'

import { $alert, $confirm, $toast } from '@/utils/alert'
import { $t } from '@/plugins/i18n'
import DetailsRessource from '@/views/Admin/Ressources/Details.vue'
import { MAX_RESSOURCES_ENSEIGNANT } from '@/utils/constants'

defineOptions({ name: 'DetailsEnseignant' })

const props = defineProps({
    enseignant: { required: true, type: Object },
})

const tabs = [
	{ icon: 'briefcase', key: 'formations', title: $t('formations.dispensees') },
	{ icon: 'save', key: 'ressources', title: $t('ressources.affectees') },
]
const activeTab = ref('')
const proceeding = ref(false)
const submitted = ref(false)
const item = ref(false)
const search = reactive({
	formations: '',
	ressources: '',
})

const parcours = ref([])
const showableParcours = computed(() => parcours.value.filter(({ formation, apprenant }) => {
	if (search.formations === '') {
		return true
	}

	return formation.intitule.toLowerCase().includes(search.formations.toLowerCase()) 
		|| apprenant.username.toLowerCase().includes(search.formations.toLowerCase())
}))

const availableRessources = ref([])
const checkedRessources = ref([])
const openAddRessource = ref(false)
const openRessource = ref(false)
const ressources = ref([])
const showableRessources = computed(() => ressources.value.filter(({ nom }) => {
	return search.ressources === '' ? true : nom.toLowerCase().includes(search.ressources.toLowerCase())
}))

const addBtnTooltip = computed(() => {
	if (activeTab.value === 'ressources') {
		return $t('attribuer_une_ressource')
	}
	if (activeTab.value === 'formations') {
		return $t('assigner_une_formation')
	}
	return ''
})
const addBtnDisabled = computed(() => {
	if (activeTab.value === 'ressources') {
		return props.enseignant.ressources_count >= MAX_RESSOURCES_ENSEIGNANT
	}
	return false
})

onMounted(() => changeTab('formations'))


function changeTab(tab) {
	activeTab.value = tab
	if (tab === 'formations') {
		getFormations()
	} else if (tab === 'ressources') {
		getResources()
	}
}
function doAdd() {
	if (activeTab.value === 'formations') {
		// 
	} else if (activeTab.value === 'ressources') {
		addRessource()
	}
}

function getFormations() {
	proceeding.value = true

	// eslint-disable-next-line no-undef
	$.get(route('admin.enseignants.parcours', props.enseignant.id)).done(data => {
		parcours.value = data
		proceeding.value = false
	})

}

function getResources() {
	proceeding.value = true
	
	// eslint-disable-next-line no-undef
	$.get(route('admin.enseignants.ressources', props.enseignant.id)).done(data => {
		ressources.value = data
		proceeding.value = false
	})
}
function showRessource(ressource) {
	item.value = ressource
	openRessource.value = true
}
function removeRessource(ressource) {
	$confirm($t('voulez_vous_vraiment_retirer_la_ressource_X_a_Y', [ressource.nom, props.enseignant.username]), () => {
		// eslint-disable-next-line no-undef
		$.post(route('admin.ressources.enseignants', ressource.id), { _method: 'DELETE', enseignants: [props.enseignant.id] }).done(() => {
			item.value = null
			openRessource.value = false
			getResources()
			// eslint-disable-next-line vue/no-mutating-props
			props.enseignant.ressources_count--
		}).fail(({ responseJSON }) => {
			const { errors } = responseJSON
			if (errors.default) {
				$alert.error(errors.default)
			} else {
				$alert.error($t('une_erreur_s_est_produite'))
			}
		})
	}, { showLoaderOnConfirm: true })
}
function addRessource() {
	openAddRessource.value    = true
	availableRessources.value = []
	checkedRessources.value   = []
	proceeding.value          = true

	// eslint-disable-next-line no-undef
	$.get(`${route('admin.enseignants.ressources', props.enseignant.id)}?where-not=1`).done(response => {
		availableRessources.value = response
		proceeding.value          = false
	})
}
function processAddRessource() {
	submitted.value = true
	// eslint-disable-next-line no-undef
	$.post(route('admin.enseignants.ressources', props.enseignant.id), { ressources: checkedRessources.value }).done(response => {
		openAddRessource.value = false
		submitted.value        = false
		$toast.success(response.message)
		getResources()
		// eslint-disable-next-line vue/no-mutating-props, camelcase
		props.enseignant.ressources_count += checkedRessources.value.length
	}).fail(({ responseJSON }) => {
		const { errors } = responseJSON
		if (errors.default) {
			$alert.error(errors.default)
		} else {
			$alert.error($t('une_erreur_s_est_produite'))
		}
		submitted.value = false
	})
}
</script>
