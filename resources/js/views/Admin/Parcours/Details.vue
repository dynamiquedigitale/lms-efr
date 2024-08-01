<template>
	<b-nav pills class="mb-3">
		<b-nav-item v-for="({ icon, key, title }) in tabs" :key="key" :active="activeTab == key" @click.prevent="changeTab(key)">
			<app-icon :name="icon" />
			<span class="fw-bold">{{ title }}</span>
		</b-nav-item>
	</b-nav>

	<b-overlay :show="proceeding" rounded="sm">
		<b-row v-if="activeTab === 'details'">
			<b-col cols="12">
				<b-card class="border-primary">
					<div class="d-flex border-bottom mb-1 pb-25">
						<h4 class="fw-bolder">{{ $t('formations.title') }}</h4>
						<span style="line-height: 1.75;" :class="`ms-auto pb-0 badge bg-${$statusVariant(parcours.statut)}`">{{ $t(`statut.${parcours.statut}`) }}</span>
					</div>
					<div class="d-lg-flex">
						<a href="#">
							<img :src="formation.cover_url" alt="" width="80" height="80" class="rounded">
						</a>
						<div class="ms-lg-1 mt-2 mt-lg-0">
							<h4 class="mb-1 h5">
								<a href="#" class="text-inherit text-truncate">{{ formation.intitule }}</a>
							</h4>
							<div class="d-flex align-items-center">
								<span :class="`badge bg-light-${$statusVariant(formation.niveau)}`">{{ $t(`difficulte.${formation.niveau}`) }}</span>
								<b-progress class="flex-fill ms-1">
									<b-progress-bar :value="parcours.progression" :label="`${parcours.progression.toFixed(2)}%`" :class="`bg-${$percentageVariant(parcours.progression)}`" />
								</b-progress>
							</div>
							<div class="p-1 bg-light rounded-3 mt-1">
								<p class="fs-6">{{ html_entity_decode(formation.description) }}</p>
							</div>
						</div>
					</div>
				</b-card>
			</b-col>
			<b-col sm="12" lg="6" class="mt-1">
				<b-card>
					<div class="d-flex border-bottom mb-1 pb-25">
						<h4 class="fw-bolder">{{ $t('apprenants.title') }}</h4>
						<span style="line-height: 1.75;" :class="`ms-auto pb-0 badge bg-${$statusVariant(apprenant.statut_compte)}`">{{ $t(`statut.${apprenant.statut_compte}`) }}</span>
					</div>
					<div class="d-lg-flex">
						<a href="#">
							<img :src="apprenant.avatar" alt="" width="80" height="80" class="rounded">
						</a>
						<div class="ms-lg-1 mt-2 mt-lg-0">
							<h4 class="mb-1 h5">
								<a href="#" class="text-inherit text-truncate">{{ apprenant.username }}</a>
							</h4>
							<span class="badge badge-light-primary profile-badge">{{ apprenant.matricule }}</span>
							<span class="text-muted w-100 d-inline-block mt-1">{{ apprenant.user_email }}</span>
						</div>
					</div>
				</b-card>
			</b-col>
			<b-col sm="12" lg="6" class="mt-1">
				<b-card>
					<div class="d-flex border-bottom mb-1 pb-25">
						<h4 class="fw-bolder">{{ $t('enseignants.title') }}</h4>
						<span style="line-height: 1.75;" :class="`ms-auto pb-0 badge bg-${$statusVariant(enseignant.statut_compte)}`">{{ $t(`statut.${enseignant.statut_compte}`) }}</span>
					</div>
					<div class="d-lg-flex">
						<a href="#">
							<img :src="enseignant.avatar" alt="" width="80" height="80" class="rounded">
						</a>
						<div class="ms-lg-1 mt-2 mt-lg-0">
							<h4 class="mb-1 h5">
								<a href="#" class="text-inherit text-truncate">{{ enseignant.username }}</a>
							</h4>
							<span class="badge badge-light-primary profile-badge">{{ enseignant.matricule }}</span>
							<span class="text-muted w-100 d-inline-block mt-1">{{ enseignant.user_email }}</span>
						</div>
					</div>
				</b-card>
			</b-col>
		</b-row>
		<div v-else-if="activeTab === 'cours'" class="overflow-y-auto" style="height: 30em">
			<draggable v-model="cours" item-key="id" class="row" @update="sortCours">
				<template #item="{ element: cour }">
					<b-col lg="6" sm="12">
						<b-card class="border" body-class="d-lg-flex align-items-start p-1" style="cursor: move">
							<div :class="`avatar bg-light-${$statusVariant(cour.statut)} avatar-md`" v-b-tooltip.hover.bottom="$t(`statut.${cour.statut}`)">
								<span class="avatar-content">{{ cour.lecon.abbr }}</span>
							</div>
							<div class="ms-lg-1 mt-2 mt-lg-0 flex-fill">
								<div class="mb-1">
									<span class="h5 text-truncate">{{ cour.lecon.intitule }}</span>
									<div class="dropdown ms-1 float-end">
										<app-button variant="light" icon="more-horizontal" class="p-0" data-bs-toggle="dropdown" text="" />
										<div class="dropdown-menu dropdown-menu-end">
											<a class="dropdown-item" href="#" @click.prevent>
												<app-icon name="edit" class="align-middle me-50" />
												<span class="align-middle">{{ $t('action.editer') }}</span>
											</a>
											<a class="dropdown-item text-danger" href="#" @click.prevent>
												<app-icon name="trash-2" class="align-middle me-50" />
												<span class="align-middle">{{ $t('action.retirer') }}</span>
											</a>
										</div>
									</div>
								</div>
								<div class="p-1 bg-light rounded-3 w-100" style="height: 5em">
									<p class="fs-6">{{ cour.lecon.description }}</p>
								</div>
							</div>
						</b-card>
					</b-col>
				</template>
			</draggable>
		</div>
		<editor v-else-if="activeTab === 'objectif'" v-model="objectif" height="25em" @save="updateObjectif" />
	</b-overlay>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import draggable from 'vuedraggable'

import { $alert, $toast } from '@/utils/alert'
import { $t } from '@/plugins/i18n'
import Editor from '@/components/efr/Editor.vue'
import { html_entity_decode } from 'php-in-js/modules/string'
import { Inertia } from '@inertiajs/inertia'

defineOptions({ name: 'DetailsParcours' })

const props = defineProps({
    parcours: { required: true, type: Object },
})

const tabs = [
	{ icon: 'info', key: 'details', title: $t('details') },
	{ icon: 'file', key: 'objectif', title: $t('obectif_pedagogique') },
	{ icon: 'book-open', key: 'cours', title: $t('lecons.title', 2) },
]
const activeTab = ref('')
const proceeding = ref(false)

const objectif = ref(html_entity_decode(props.parcours.objectif))

const apprenant  = computed(() => props.parcours.apprenant)
const enseignant = computed(() => props.parcours.enseignant)
const formation  = computed(() => props.parcours.formation)

const cours = ref([])


onMounted(() => changeTab('details'))


function changeTab(tab) {
	activeTab.value = tab
	if (tab === 'cours') {
		getCours()
	}
}

function updateObjectif() {
	// eslint-disable-next-line no-undef
	Inertia.patch(route('admin.parcours.update', props.parcours?.id), { objectif: objectif.value }, {
		onError(errors) {
			if (errors.default) {
				$alert.error(errors.default)
			} else {
				$alert.error($t('une_erreur_s_est_produite'))
			}
		},
		onFinish() {
			proceeding.value = false
		},
		onStart() {
			proceeding.value = true		
		},
		onSuccess({ props }) {
			$toast.success(props.flash.success)
    	},
	})
}

/**
 * Recupere la liste des cours du parcours
 */
function getCours() {
	proceeding.value = true
	// eslint-disable-next-line no-undef
	$.get(route('admin.cours.parcours', props.parcours.id)).done(data => {
		cours.value      = data
		proceeding.value = false
	})
}
/**
 * Reorganise les cours
 */
function sortCours() {
	// eslint-disable-next-line no-undef
	$.post(route('admin.cours.sort', props.parcours.id), { _method: 'PATCH', cours: [...cours.value].map(({ id }) => id) })
}
</script>
