<template>
	<b-nav pills small class="mb-2 flex-nowrap">
		<b-nav-item link-class="px-1" v-for="({ icon, key, title }) in tabs" :key="key" :active="activeTab == key" @click.prevent="changeTab(key)">
			<app-icon :name="icon" />
			<span class="fw-bold">{{ title }}</span>
			<span class="badge bg-secondary rounded-pill ms-1" v-if="['lecons', 'parcours'].includes(key)">{{ formation[`${key}_count`] || 0 }}</span>
		</b-nav-item>
		<b-nav-item link-class="btn-flat-primary btn-icon waves-effect border" v-if="activeTab === 'lecons'" icon @click.prevent="action = 'add-lecons'">
			<app-icon name="plus" style="margin: 0 !important" />
		</b-nav-item>
	</b-nav>

	<b-overlay :show="proceeding" rounded="sm">
		<b-card no-body>
			<b-row class="g-0 overflow-hidden" v-if="activeTab === 'details'">
			  	<b-col md="4">
					<b-card-img :src="formation.cover_url" :alt="formation.intitule" class="rounded-0" />
			  	</b-col>
			  	<b-col md="8">
					<b-card-body :title="formation.intitule" class="pt-1">
						<span :class="`badge bg-light-${$statusVariant(formation.niveau)}`">{{ $t(`difficulte.${formation.niveau}`) }}</span>
						<div class="p-1 bg-light rounded-3 mt-2">
							<p class="fs-6">{{ formation.description }}</p>
						</div>
					</b-card-body>
			  	</b-col>
			</b-row>

			<div v-else-if="activeTab === 'parcours'">
				
			</div>

			<b-card-body v-else-if="activeTab === 'lecons'">
				<b-form-group :label="$t('selectionnez_la_lecon_a_ajouter')" class="mb-1" v-if="action == 'add-lecons'">
					<div class="d-flex w-100">
						<app-select 
							v-model="addedLecon"
							style="flex: 1" label="intitule" 
							searchable :options="availableLecons" 
							:settings="{ dropdownParent: $('#formation-dialog') }"
						/>
						<b-button-group size="sm" class="ms-1">
							<app-button tooltip variant="flat-primary" icon="check" @click.prevent="addLecon" />
							<app-button tooltip variant="flat-danger" icon="x" @click.prevent="() => { action = ''; addedLecon = null; }" />
						</b-button-group>
					</div>
				</b-form-group>
				<app-empty-items v-if="!lecons.length" :message="$t('aucune_lecon_attachee_a_cette_formation')" />
				<draggable v-else v-model="lecons" item-key="id" @update="sortLecon">
					<template #item="{ element: lecon }">
						<ul class="list-group mb-1">
							<li class="list-group-item d-flex align-items-center">
								<i class="fas fa-up-down"></i>
								<div class="avatar bg-light-primary avatar-md mx-1">
									<span class="avatar-content">{{ lecon.abbr }}</span>
								</div>
								<span>{{ lecon.intitule }}</span>
								<app-button variant="flat-danger" icon="x" tooltip class="p-0 ms-auto" @click.prevent="removeLecon(lecon)" />
							</li>
						</ul>
					</template>
      			</draggable>
				
			</b-card-body>
		</b-card>
	</b-overlay>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import draggable from 'vuedraggable'

import { $alert, $confirm, $toast } from '@/utils/alert'
import { $t } from '@/plugins/i18n'

defineOptions({ name: 'DetailsFormation' })

const { $ } = window

const props = defineProps({
    formation: { required: true, type: Object },
})

const tabs = [
	{ icon: 'file-text', key: 'details', title: $t('details') },
	{ icon: 'book-open', key: 'lecons', title: $t('lecons.title') },
	{ icon: 'briefcase', key: 'parcours', title: $t('parcours.title') },
]

const activeTab = ref('')
const proceeding = ref(false)
const action = ref('')

const availableLecons = ref([])
const addedLecon = ref(null)
const lecons = ref([])

onMounted(() => changeTab('details'))


function changeTab(tab) {
	activeTab.value = tab

	if (tab === 'lecons') {
		getLecons()
	}
}

function addLecon() {
	const { value: lecon } = addedLecon
	
	if (!lecon || lecon === '') {
		$alert.error($t('veuillez_selectionner_la_lecon_a_ajouter'))
		return
	}

	proceeding.value = true
	// eslint-disable-next-line no-undef
	$.post(route('admin.formations.lecons', props.formation.id), { lecons: [lecon] }).done(response => {
		proceeding.value = false
		action.value     = ''
		addedLecon.value = null
		$toast.success(response.message)
		getLecons(true)
		// eslint-disable-next-line vue/no-mutating-props, camelcase
		props.formation.lecons_count += 1
	}).fail(({ responseJSON }) => {
		const { errors } = responseJSON
		if (errors.default) {
			$alert.error(errors.default)
		} else {
			$alert.error($t('une_erreur_s_est_produite'))
		}
		proceeding.value = false
	})
}
function getLecons(refresh = false) {
	proceeding.value = true
	
	// eslint-disable-next-line no-undef
	$.get(route('admin.formations.lecons', props.formation.id)).done(data => {
		lecons.value = data
		proceeding.value = false
	})

	if (!availableLecons.value.length || refresh) {
		// eslint-disable-next-line no-undef
		$.get(`${route('admin.formations.lecons', props.formation.id)}?where-not=1`).done(response => {
			availableLecons.value = response
		})
	}
}
function sortLecon() {
	// eslint-disable-next-line no-undef
	$.post(route('admin.formations.lecons', props.formation.id), { _method: 'PATCH', lecons: [...lecons.value].map(({ id }) => id) })
}
function removeLecon(lecon) {
	$confirm($t('voulez_vous_vraiment_retirer_la_lecon_X_a_la_formation_Y', [lecon.intitule, props.formation.intitule]), () => {
		// eslint-disable-next-line no-undef
		$.post(route('admin.formations.lecons', props.formation.id), { _method: 'DELETE', lecons: [lecon.id] }).done((response) => {
			$toast.success(response.message)
			getLecons(true)
			// eslint-disable-next-line vue/no-mutating-props, camelcase
			props.formation.lecons_count -= 1
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
