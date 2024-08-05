<template>
    <b-form @submit.prevent="submitForm" autocomplete="false" :disabled="submitted">
		<app-fieldset :title="$t('concernes')" class="mb-1">
			<b-overlay :show="fetching.apprenant" rounded="sm" spinner-type="grow" spinner-small><app-form-group 
				v-model="form.apprenant_id" 
				class="mb-1" type="select" select-key="username"
				required searchable 
				:error="error.apprenant_id" 
				:label="$t('apprenants.title')" 
				:placeholder="$t('selectionnez')" 
				:options="apprenants" 
			/></b-overlay>
			<b-overlay :show="fetching.parcours" rounded="sm" spinner-type="grow" spinner-small><app-form-group 
				v-model="form.parcour_id" 
				class="mb-1" type="select"
				required searchable 
				:error="error.parcour_id" 
				:label="$t('formations.title')" 
				:placeholder="$t('selectionnez')" 
				:options="parcours" 
			/></b-overlay>
			<app-form-group 
				v-model="form.cour_id" 
				type="select"
				searchable :options="cours" 
				:label="$t('lecons.title')" 
				:placeholder="$t('selectionnez')" 
			/>
		</app-fieldset>
		<app-fieldset :title="$t('meetings.title')" class="mb-1">
			<app-form-group 
				v-model="form.libelle" 
				class="mb-1" 
				required :disabled="cantFill" :error="error.libelle"
				:label="$t('form.libelle')" 
				:placeholder="$t('meetings.libelle')" 
			/>
			<app-form-group 
				v-model="form.date_deb" 
				class="mb-1" type="datetime" 
				format="ddd, DD MMMM YYYY - HH:mm"
				required :disabled="cantFill" :error="error.date_deb"
				:label="$t('form.date_deb')" 
				:placeholder="$t('meetings.date_deb')" 
			/>
			<app-form-group 
				v-model="form.duree" 
				class="mb-1" type="number" :min="10" :step="5"
				required :disabled="cantFill" :error="error.duree"
				:label="`${$t('form.duree')} (${$t('form.en_minutes')})`" 
				:placeholder="$t('meetings.duree')" 
			/>
			<app-form-group 
				v-model="form.objectif" 
				type="textarea" rows="4" no-resize
				required :disabled="cantFill" :error="error.objectif"
				:label="$t('objectif.title')" 
				:placeholder="$t('meetings.objectif')"  
			/>
		</app-fieldset>
		
		

        <div class="w-100 d-flex justify-content-center flex-end my-3">
            <app-button :text="$t('action.annuler')" variant="danger" class="me-2" @click.prevent="emit('reset')" />
            <app-button type="submit" :text="$t(`action.${action === 'create' ? 'ajouter' : 'modifier'}`)" :loading="submitted" />
        </div>
    </b-form>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useForm } from '@inertiajs/inertia-vue3'

import { $alert, $toast } from '@/utils/alert'
import { $t } from '@/plugins/i18n'
import { STATUT } from '@/enums/statut'

defineOptions({ name: 'FormMeeting' })

const emit = defineEmits(['completed', 'reset'])

const props = defineProps({
    action: { required: true, type: String },
    item: { default: null, type: [Object, null] },
})

const submitted = ref(false)

const form = useForm({
	// eslint-disable-next-line camelcase
	apprenant_id: props.item?.apprenant_id || null,
	// eslint-disable-next-line camelcase
	cour_id: props.item?.cour_id || null,
	// eslint-disable-next-line camelcase
	date_deb: props.item?.date_deb || null,
	duree: props.item?.duree || null,
	libelle: props.item?.libelle || null,
	objectif: props.item?.objectif || null,
	// eslint-disable-next-line camelcase
	parcour_id: props.item?.parcour_id || null,
})
const error = reactive({
	// eslint-disable-next-line camelcase
	apprenant_id: null,
	// eslint-disable-next-line camelcase
	date_deb: null,
	duree: null,
	libelle: null,
	objectif: null,
	// eslint-disable-next-line camelcase
	parcour_id: null,
})

const fetching  = reactive({
	apprenant: false,
	parcours : false,
})
const apprenants = ref([])
const parcours = ref([])
const cours = ref([])

const cantFill = computed(() => form.apprenant_id === null || form.parcour_id === null)

watch(() => form.apprenant_id, (val) => getParcoursApprenant(val))
watch(() => form.parcour_id, (val) => {
	const c = parcours.value.find(({ id }) => id == val)?.cours
	if (c) {
		cours.value = c.map(({ id, lecon }) => ({ id, text: lecon.intitule }))
	}
})

onMounted(() => getApprenants())

/**
 * Recupere les apprenants ayant une formation en cours
 */
function getApprenants() {
	const params             = { limit: -1, 'with-active-path': 1 }
	      fetching.apprenant = true
	
	// eslint-disable-next-line no-undef
	$.get(route('admin.apprenants.list'), params).done(data => {
		apprenants.value   = data
		fetching.apprenant = false
	})
}
/**
 * Recupere les parcours suivis par un apprenant
 */
// eslint-disable-next-line camelcase
function getParcoursApprenant(apprenant_id) {
	fetching.parcours = true
	const params      = { 
		statut      : [STATUT.ACTIVE, STATUT.IN_PROGRESS].join(','),
		'with-cours': 1,
	}

	// eslint-disable-next-line no-undef
	$.get(route('admin.apprenants.parcours', apprenant_id), params).done(data => {
		parcours.value = data.map(({ id, formation, enseignant, cours }) => ({
			cours,
			id,
			text: `${formation.intitule} - ${enseignant.username} - ${$t('cours.title', cours.length)}`,
		}))
		fetching.parcours = false
	})
}

function submitForm() {
	// eslint-disable-next-line no-undef
	const url = props.action === 'create' ? route('admin.meetings.create') : route('admin.meetings.update', props.item?.id)
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
		form.post(url, options)
	} else {
		form.patch(url, options)
	}
}
</script>
