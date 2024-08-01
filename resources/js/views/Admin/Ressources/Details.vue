<template>
	<b-tabs v-model="tab" nav-class="tabs-line flex-nowrap">
		<b-tab active>
			<template #title><app-icon name="file" /><span class="align-middle ms-25">Details</span></template>
			
			<ressource-viewer :ressource="ressource" />
			<hr class="my-2" />
			<h6 class="file-manager-title my-2">{{ $t('informations') }}</h6>
			<ul class="list-unstyled">
				<li class="d-flex justify-content-between align-items-center">
					<p>{{ $t('fichier.type') }}</p>
					<p class="fw-bold">{{ ressource.ext }}</p>
				</li>
				<li class="d-flex justify-content-between align-items-center">
					<p>{{ $t('fichier.taille') }}</p>
					<p class="fw-bold">{{ ressource.sizeText }}</p>
				</li>
				<li class="d-flex justify-content-between align-items-center">
					<p>{{ $t('timestamps.added_at') }}</p>
					<p class="fw-bold">{{ $dayjs(ressource.created_at).format('DD MMMM YYYY') }}</p>
				</li>
			</ul>
			<div class="py-1 bg-light rounded-3" v-if="ressource.description !== '' && ressource.description !== null">
				<div class="container-fluid">{{ ressource.description }}</div>
			</div>
			
		</b-tab>
		<b-tab>
			<template #title><app-icon name="briefcase" /><span class="align-middle ms-25">{{ $t('parcours.title') }}</span></template>
			<p>I'm the second tab</p>
		</b-tab>
		<b-tab>
			<template #title><app-icon name="users" /><span class="align-middle ms-25">{{ $t('enseignants.title') }}</span></template>
			<b-overlay :show="loading" rounded="sm" :opacity="0.95">
				<app-empty-items v-if="!enseignants.length" :message="$t('aucun_enseignant_affecter_a_cette_ressource')" />
				<b-row class="">
					<b-col cols="12" v-for="enseignant in enseignants" :key="enseignant.id">
						<b-card body-class="p-1" class="mb-1">
							<div class="d-flex justify-content-between align-items-center">
								<div class="d-flex flex-row">
								  	<div class="avatar me-75">
										<b-img class="rounded" :src="enseignant.avatar" :alt="enseignant.username" height="42" width="42" />
								  	</div>
								  	<div class="my-auto">
										<h6 class="mb-0">{{ enseignant.username }}</h6>
										<small>{{ enseignant.user_email }}</small>
								  	</div>
								</div>
								<div v-if="!readonly" class="d-flex align-items-center" style="position: relative;">
									<app-button size="sm" variant="flat-danger" icon="trash" :text="$t('action.retirer')" tooltip @click.prevent="removeEnseignant(enseignant)" />
								</div>
							</div>
						</b-card>
					</b-col>
				</b-row>
			</b-overlay>
		</b-tab>
	</b-tabs>
</template>

<script setup>
import { ref, watch } from 'vue'

import { $alert, $confirm } from '@/utils/alert'
import { $t } from '@/plugins/i18n'
import RessourceViewer from '@/components/RessourceViewer.vue'

defineOptions({ name: 'DetailsRessource' })

const props = defineProps({
	readonly: { default: false, type: Boolean },
	ressource: { required: true, type: Object },
})

const tab = ref('details')
const enseignants = ref([])

const loading = ref(false)

watch(tab, (value) => {
	if (value === 2) {
		getEnseignants()
	}
})

function getEnseignants() {
	enseignants.value = []
	loading.value     = true

	// eslint-disable-next-line no-undef
	$.get(route('admin.ressources.enseignants', props.ressource.id)).done(response => {
		enseignants.value = response
		loading.value     = false
	})
}

function removeEnseignant(enseignant) {
	$confirm($t('voulez_vous_vraiment_retirer_la_ressource_X_a_Y', [props.ressource.nom, enseignant.username]), () => {
		// eslint-disable-next-line no-undef
		$.post(route('admin.ressources.enseignants', props.ressource.id), { _method: 'DELETE', enseignants: [enseignant.id] }).done(() => {
			getEnseignants()
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
</script>

<style>

</style>
