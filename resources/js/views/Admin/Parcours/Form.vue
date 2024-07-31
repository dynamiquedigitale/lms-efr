<template>
    <b-form @submit.prevent="submitForm" autocomplete="false" :disabled="submitted">
		<b-nav pills class="mb-1" v-if="form.formation_id">
			<b-nav-item v-for="({ icon, key, title }) in tabs" :key="key" :active="activeTab == key" @click.prevent="activeTab = key">
				<app-icon :name="icon" />
				<span class="fw-bold">{{ title }}</span>
			</b-nav-item>
		</b-nav>

		<div v-show="activeTab === 'details'">
			<b-overlay :show="fetching.formation" rounded="sm" spinner-type="grow" spinner-small><app-form-group 
				v-model="form.formation_id" 
				class="mb-1" type="select" select-key="intitule" 
				required searchable 
				:error="error.formation_id" 
				:label="$t('formations.title')" 
				:placeholder="$t('selectionnez')" 
				:options="formations" 
				:disabled="formationId !== null" 
			/></b-overlay>
			<b-overlay :show="fetching.apprenant" rounded="sm" spinner-type="grow" spinner-small><app-form-group 
				v-model="form.apprenant_id" 
				class="mb-1" type="select" select-key="username"
				required searchable 
				:error="error.apprenant_id" 
				:label="$t('apprenants.title')" 
				:placeholder="$t('selectionnez')" 
				:options="apprenants" 
				:disabled="apprenantId !== null" 
			/></b-overlay>
			<b-overlay :show="fetching.enseignant" rounded="sm" spinner-type="grow" spinner-small><app-form-group 
				v-model="form.enseignant_id" 
				class="mb-1" type="select" select-key="username"
				required searchable 
				:error="error.enseignant_id"  
				:label="$t('enseignants.title')" 
				:placeholder="$t('selectionnez')" 
				:options="enseignants"
				:disabled="enseignantId !== null" 
			/></b-overlay>
		</div>
		<div v-show="activeTab === 'objectif'">
			<editor v-model="form.objectif" height="18em" @save="submitForm" />
		</div>
		<div v-show="activeTab === 'lecons'" style="max-height: 18em" class="overflow-y-auto">
			<app-empty-items 
				v-if="!form.lecons.length" 
				:message="$t('aucune_lecon_attachee_au_parcours')"
				:btn-text="$t('action.reinitialiser_la_liste')"
				instruction=""
				:action="refreshListLecon"
			/>
			<draggable v-else v-model="form.lecons" item-key="id" ghost-class="bg-primary">
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
		</div>
			
		<div class="w-100 d-flex justify-content-center flex-end mt-2 mb-1">
			<app-button :text="$t('action.annuler')" variant="danger" class="me-2" @click.prevent="emit('reset')" />
			<app-button type="submit" :text="$t(`action.${action === 'create' ? 'ajouter' : 'modifier'}`)" :loading="submitted" />
		</div>
    </b-form>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { html_entity_decode } from 'php-in-js/modules/string'
import { useForm } from '@inertiajs/inertia-vue3'

import { $alert, $toast } from '@/utils/alert'
import { $t } from '@/plugins/i18n'
import Editor from '@/components/efr/Editor.vue'

const { $ } = window

defineOptions({ name: 'FormParcours' })

const emit = defineEmits(['completed', 'reset'])

const props = defineProps({
	action: { required: true, type: String },
    apprenantId: { default: null, type: [Number] },
    enseignantId: { default: null, type: [Number] },
    formationId: { default: null, type: [Number] },
    item: { default: null, type: [Object, null] },
})

const tabs = [
	{ icon: 'info', key: 'details', title: $t('details') },
	{ icon: 'file', key: 'objectif', title: $t('obectif_pedagogique') },
	{ icon: 'book-open', key: 'lecons', title: $t('lecons.title') },
]
const activeTab = ref('details')

const fetching  = reactive({
	apprenant : false,
	enseignant: false,
	formation : false,
})
const submitted = ref(false)

const form = useForm({
	// eslint-disable-next-line camelcase
	apprenant_id : props.item?.apprenant_id || props.apprenantId,
	// eslint-disable-next-line camelcase
	enseignant_id: props.item?.enseignant_id || props.enseignantId,
	// eslint-disable-next-line camelcase
	formation_id : props.item?.formation_id || props.formationId,
	lecons: [],
	objectif: props.item?.objectif || null,
})
const error = reactive({
	// eslint-disable-next-line camelcase
	apprenant_id : null,
	// eslint-disable-next-line camelcase
	enseignant_id: null,
	// eslint-disable-next-line camelcase
	formation_id : null,
})

const apprenants  = ref([])
const enseignants = ref([])
const formations  = ref([])

watch(() => form.formation_id, (val) => {
	const objectif      = formations.value.find(({ id }) => id == val)?.objectif
	      form.objectif = html_entity_decode(objectif)
	refreshListLecon()
})


onMounted(() => getItems())

/**
 * Recupere les elements necessaire au formulaire (enseignants, apprenants, formations)
 */
function getItems() {
	const params = { limit: -1 }

	fetching.apprenant  = true
	fetching.enseignant = true
	fetching.formation  = true

	// eslint-disable-next-line no-undef
	$.get(route('admin.apprenants.index'), params).done(({ data }) => {
		apprenants.value   = data
		fetching.apprenant = false
	})
	// eslint-disable-next-line no-undef
	$.get(route('admin.enseignants.index'), params).done(({ data }) => {
		enseignants.value   = data
		fetching.enseignant = false
	})
	// eslint-disable-next-line no-undef
	$.get(route('admin.formations.index'), params).done(({ data }) => {
		formations.value   = data
		fetching.formation = false
	})
}

/**
 * Retire les lecons lors de la creation du parcours
 */
function removeLecon(lecon) {
	form.lecons = [...form.lecons].filter(({ id }) => id != lecon.id)
}
function refreshListLecon() {
	// eslint-disable-next-line no-undef
	$.get(route('admin.formations.lecons', form.formation_id)).done(data => {
		form.lecons = data
	})
}

function submitForm() {
	// eslint-disable-next-line no-undef
	const url = props.action === 'create' ? route('admin.parcours.create') : route('admin.parcours.update', props.item?.id)
	const options = {
		onError(errors) {
			let message = ''
			if (errors.default) {
				$alert.error(errors.default)
			} else if (Object.keys(errors).length) {
				for (const key in errors) {
					// eslint-disable-next-line prefer-destructuring
					const errMsg = errors[key].default
					if (Object.keys(error).includes(key)) {
						error[key] = errMsg
					} else {
						// eslint-disable-next-line @stylistic/js/quotes
						message += "\n" + errMsg
					}
				}
			} else if (!message !== '') {
				$alert.error(message)
			} else {
				$alert.error($t('une_erreur_s_est_produite'))
			}
		},
		onFinish() {
			submitted.value = false
		},
		onStart() {
			submitted.value = true
			for (const key in error) {
				error[key] = null
			}		
		},
		onSuccess({ props }) {
			form.reset()
			$toast.success(props.flash.success)
			
			emit('completed')
    	},
	}
	
	if (props.action === 'create') {
		form.transform(data => ({
			...data,
			lecons: data.lecons.map(({ id }) => id),
		})).post(url, options)
	} else {
		form.transform(data => ({
			...data,
			lecons: data.lecons.map(({ id }) => id),
		})).patch(url, options)
	}
}
</script>
