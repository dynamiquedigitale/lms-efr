<template>
    <b-form class="mt-1" @submit.prevent="submitForm" autocomplete="false" :disabled="submitted">
		<app-form-group v-model="form.intitule" :error="error.intitule" :label="$t('intitule.title')" :placeholder="$t('intitule.placeholder_lecon')" required />
		<app-form-group v-model="form.description" :error="error.description" :label="$t('description')" class="mt-1 mb-3" type="textarea" rows="4" />
		
        <div class="w-100 d-flex justify-content-center flex-end mt-10">
            <app-button :text="$t('action.annuler')" variant="danger" class="me-2" @click.prevent="emit('reset')" />
            <app-button type="submit" :text="$t(`action.${action === 'create' ? 'ajouter' : 'modifier'}`)" :loading="submitted" />
        </div>
    </b-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useForm } from '@inertiajs/inertia-vue3'

import { $alert, $toast } from '@/utils/alert'
import { $t } from '@/plugins/i18n'

defineOptions({ name: 'FormLecon' })

const emit = defineEmits(['completed', 'reset'])

const props = defineProps({
    action: { required: true, type: String },
    item: { default: null, type: [Object, null] },
})

const submitted = ref(false)

const form = useForm({
	description: props.item?.description || null,
   	intitule: props.item?.intitule || null,
})
const error = reactive({
	description: null,
   	intitule: null,
})


function submitForm() {
	// eslint-disable-next-line no-undef
	const url = props.action === 'create' ? route('admin.lecons.create') : route('admin.lecons.update', props.item?.id)
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
