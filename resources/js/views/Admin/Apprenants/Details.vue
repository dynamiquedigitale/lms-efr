<template>
    <b-row>
		<b-col xl="4" lg="5" md="5" order="1" order-md="0">
			<b-card>
				<div class="user-avatar-section">
					<div class="d-flex align-items-center flex-column">
						<b-img :src="apprenant.avatar" rounded fluid class="mt-3 mb-2" height="110" width="110" :alt="apprenant.username" />
					  	<div class="user-info text-center">
							<h4>{{ apprenant.username }}</h4>
							<span class="badge bg-light-secondary">{{ apprenant.matricule }}</span>
					 	</div>
					</div>
				</div>
				<div class="d-flex justify-content-around my-2 pt-75">
					<div class="d-flex align-items-start">
					  	<span class="badge bg-light-primary p-75 rounded">
							<app-icon name="briefcase" class="font-medium-2" />
					  	</span>
					  	<div class="ms-75">
							<h4 class="mb-0">{{ apprenant.parcours_count }}</h4>
							<small>{{ $t('formations.title') }}</small>
					  	</div>
					</div>
					<div class="d-flex align-items-start me-2">
						<span class="badge bg-light-primary p-75 rounded">
						  <app-icon name="check" class="font-medium-2" />
						</span>
						<div class="ms-75">
						  <h4 class="mb-0">--</h4>
						  <small>{{ $t('evaluations.title') }}</small>
						</div>
				  	</div>
				</div>
				<h4 class="fw-bolder border-bottom pb-50 mb-1">{{ $t('details') }}</h4>
				<div class="info-container">
					<ul class="list-unstyled">
					  	<li class="mb-75">
							<span class="fw-bolder me-25">{{ $t('email.title') }}:</span>
							<span>{{ apprenant.user_email }}</span>
					  	</li>
					  	<li class="mb-75">
							<span class="fw-bolder me-25">{{ $t('tel.title') }}:</span>
							<span>{{ apprenant.tel }}</span>
					  	</li>
					  	<li class="mb-75">
							<span class="fw-bolder me-25">{{ $t('statut.title') }}:</span>
							<span class="badge bg-light-success">{{ $t(`statut.${apprenant.statut_compte}`) }}</span>
						</li>
					  	<li class="mb-75">
							<span class="fw-bolder me-25">{{ $t('date_naissance') }}:</span>
							<span>{{ $dayjs(apprenant.date_naiss).format('DD MMMM YYYY')}}</span>
					  	</li>
					  	<li class="mb-75">
							<span class="fw-bolder me-25">{{ $t('sexe.title') }}:</span>
							<span>{{ $t(`sexe.${apprenant.sexe}`)}}</span>
					  	</li>
					  	<li class="mb-75">
							<span class="fw-bolder me-25">{{ $t('lieu_residence.title') }}:</span>
							<span>{{ apprenant.lieu_residence }}</span>
					  	</li>
					</ul>
					<!-- <div class="d-flex justify-content-center pt-2">
					  <a href="javascript:;" class="btn btn-primary me-1 waves-effect waves-float waves-light" data-bs-target="#editUser" data-bs-toggle="modal">
						Edit
					  </a>
					  <a href="javascript:;" class="btn btn-outline-danger suspend-user waves-effect">Suspended</a>
					</div> -->
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
								<app-button :text="addBtnTooltip" icon="plus" :tooltip="{placement: 'bottom'}" @click.prevent="doAdd" />
							</div>
						</b-col>
					</b-card-header>
					
					<b-card-body class="border-top pt-1" v-if="activeTab === 'parcours'">
						<div class="card-datatable table-responsive mb-3 pt-0 border-0 overflow-y-hidden">
							<table class="table mb-0 text-nowrap">
								<thead class="table-light">
									<tr>
										<th scope="col" class="border-0"></th>
										<th scope="col" class="border-0">{{ $t('formations.title') }}</th>
										<th scope="col" class="border-0">{{ $t('enseignants.title') }}</th>
										<th scope="col" class="border-0">{{ $t('statut.title') }}</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="({ id, cours_count, progression, statut, enseignant, formation }, i) in showableParcours" :key="id">
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
									</tr>
								</tbody>
							</table>
						</div>
					</b-card-body>
				</b-card>
			</b-overlay>
		</b-col>
	</b-row>

	<app-modal id="add-parcours" v-model="openAddParcours" :title="$t('parcours.attribuer_a_l_apprenant', [apprenant.username])" size="md" no-footer>
		<form-parcours v-if="openAddParcours" action="create" :apprenant-id="apprenant.id" @reset="openAddParcours = false" @completed="getParcours" />
	</app-modal>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'

import { $t } from '@/plugins/i18n'
import FormParcours from '@/views/Admin/Parcours/Form.vue'

defineOptions({ name: 'DetailsApprenant' })

const props = defineProps({
    apprenant: { required: true, type: Object },
})

const tabs = [
	{ icon: 'briefcase', key: 'parcours', title: $t('formations.suivies') },
	{ icon: 'check', key: 'evaluations', title: $t('evaluations.effectuees') },
	{ icon: 'dollar-sign', key: 'paiements', title: $t('paiements.effectues') },
]
const activeTab = ref('')
const proceeding = ref(false)
const search = reactive({
	parcours: '',
	ressources: '',
})

const parcours = ref([])
const openAddParcours = ref(false)
const showableParcours = computed(() => parcours.value.filter(({ formation, enseignant }) => {
	if (search.parcours === '') {
		return true
	}

	return formation.intitule.toLowerCase().includes(search.parcours.toLowerCase()) 
		|| enseignant.username.toLowerCase().includes(search.parcours.toLowerCase())
}))

const addBtnTooltip = computed(() => {
	if (activeTab.value === 'parcours') {
		return $t('assigner_une_formation')
	}
	return ''
})


onMounted(() => changeTab('parcours'))


function changeTab(tab) {
	activeTab.value = tab
	if (tab === 'parcours') {
		getParcours()
	}
}
function doAdd() {
	if (activeTab.value === 'parcours') {
		openAddParcours.value = true
	}
}


function getParcours() {
	openAddParcours.value = false
	proceeding.value = true

	// eslint-disable-next-line no-undef
	$.get(route('admin.apprenants.parcours', props.apprenant.id)).done(data => {
		parcours.value = data
		proceeding.value = false
	})
}

</script>
