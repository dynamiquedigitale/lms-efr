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
				<b-card v-if="activeTab === 'formations'" no-body>
					<b-card-header class="row">
						<b-col md="2"></b-col>
						<b-col md="8">
							<div class="d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0">
								<app-input-search />
								<app-button :text="$t('assigner_une_formation')" icon="plus" :tooltip="{placement: 'bottom'}" />
							</div>
						</b-col>
					</b-card-header>
					
					{{ formations }}
				</b-card>
			</b-overlay>
		</b-col>
	</b-row>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { $t } from '@/plugins/i18n'

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

const formations = ref([])


onMounted(() => changeTab('formations'))


function changeTab(tab) {
	activeTab.value = tab
	if (tab === 'formations') {
		getFormations()
	}
}

function getFormations() {
	proceeding.value = true

	// eslint-disable-next-line no-undef
	$.get(route('admin.enseignants.formations', props.enseignant.id)).done(data => {
		console.log({ data })
	})

}

</script>
