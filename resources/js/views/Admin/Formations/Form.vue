<template>
    <b-form class="mt-1" @submit.prevent="submitForm" autocomplete="false" :disabled="submitted">
		<b-row class="mb-3">
			<b-col lg="6">
				<app-form-group class="mb-1" v-model="form.intitule" :error="error.intitule" :label="$t('intitule.title')" :placeholder="$t('intitule.placeholder_formation')" required />
				<app-form-group 
					v-model="form.niveau" 
					class="mb-1" type="select" required
					:error="error.niveau" 
					:label="$t('difficulte.title')" 
					:placeholder="$t('selectionnez')" 
					:options="['debutant', 'moyen', 'avance', 'expert'].map(e => ({ text: $t(`difficulte.${e}`), value: e }))" 
				/>
				<app-form-group 
					v-model="form.description" 
					class="mb-1" type="textarea" rows="3" required
					:error="error.description" 
					:label="$t('description')" 
					:placeholder="$t('description')" 
				/>
				<b-form-group :label="$t('couverture')">
					<app-file-uploader v-model="form.cover" accept="image/*" max-size="2MB" theme="list" />
					<b-form-invalid-feedback v-if="error.cover != null" class="d-inline my-1">{{ error.cover }}</b-form-invalid-feedback>
				</b-form-group>
			</b-col>
			<b-col lg="6">
				<b-form-group :label="$t('obectif_pedagogique')">
					<editor v-model="form.objectif" height="22em" @save="submitForm" />
					<b-form-invalid-feedback v-if="error.objectif != null" class="d-inline my-1">{{ error.objectif }}</b-form-invalid-feedback>
				</b-form-group>
			</b-col>
		</b-row>
		
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
import Editor from '@/components/efr/Editor.vue'

defineOptions({ name: 'FormFormation' })

const emit = defineEmits(['completed', 'reset'])

defineProps({
    action: { required: true, type: String },
    item: { default: null, type: [Object, null] },
})

const submitted = ref(false)

const post = {
    cover: null,
    description: null,
    intitule: null,
    niveau: null,
	objectif: null,
}
const form = useForm({ ...post })
const error = reactive({ ...post })



function submitForm() {
	// eslint-disable-next-line no-undef
	form.post(route('admin.formations.create'), {
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
	})
}
</script>
