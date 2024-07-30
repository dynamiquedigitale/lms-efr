<template>
    <b-form @submit.prevent="submitForm" autocomplete="false" :disabled="submitted">
		<app-form-group 
			v-model="form.formation_id" 
			class="mb-1" type="select" select-key="intitule" 
			required searchable 
			:error="error.formation_id" 
			:label="$t('formations.title')" 
			:placeholder="$t('selectionnez')" 
			:options="formations" 
		/>
		<app-form-group 
			v-model="form.apprenant_id" 
			class="mb-1" type="select" select-key="username"
			required searchable 
			:error="error.apprenant_id" 
			:label="$t('apprenants.title')" 
			:placeholder="$t('selectionnez')" 
			:options="apprenants" 
		/>
		<app-form-group 
			v-model="form.enseignant_id" 
			class="mb-1" type="select" select-key="username"
			required searchable 
			:error="error.enseignant_id"  
			:label="$t('enseignants.title')" 
			:placeholder="$t('selectionnez')" 
			:options="enseignants" 
		/>
		
        <div class="w-100 d-flex justify-content-center flex-end mt-2 mb-1">
            <app-button :text="$t('action.annuler')" variant="danger" class="me-2" @click.prevent="emit('reset')" />
            <app-button type="submit" :text="$t(`action.${action === 'create' ? 'ajouter' : 'modifier'}`)" :loading="submitted" />
        </div>
    </b-form>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useForm } from '@inertiajs/inertia-vue3'

import { $alert, $toast } from '@/utils/alert'
import { $t } from '@/plugins/i18n'

const { $ } = window

defineOptions({ name: 'FormParcours' })

const emit = defineEmits(['completed', 'reset'])

const props = defineProps({
    action: { required: true, type: String },
    item: { default: null, type: [Object, null] },
})

const submitted = ref(false)

const form = useForm({
	// eslint-disable-next-line camelcase
	apprenant_id : props.item?.apprenant_id || null,
	// eslint-disable-next-line camelcase
	enseignant_id: props.item?.enseignant_id || null,
	// eslint-disable-next-line camelcase
	formation_id : props.item?.formation_id || null,
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


onMounted(() => getItems())

/**
 * Recupere les elements necessaire au formulaire (enseignants, apprenants, formations)
 */
function getItems() {
	const params = { limit: -1 }

	// eslint-disable-next-line no-undef
	$.get(route('admin.apprenants.index'), params).done(({ data }) => apprenants.value = data)
	// eslint-disable-next-line no-undef
	$.get(route('admin.enseignants.index'), params).done(({ data }) => enseignants.value = data)
	// eslint-disable-next-line no-undef
	$.get(route('admin.formations.index'), params).done(({ data }) => formations.value = data)
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
		form.post(url, options)
	} else {
		form.patch(url, options)
	}
}
</script>
