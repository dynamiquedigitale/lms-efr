<template>
    <b-form class="mt-1" @submit.prevent="submitForm" autocomplete="false" :disabled="submitted">
		<b-row class="mb-1">
			<b-col lg="6">
				<app-fieldset :title="$t('Informations de base')" class="my-1">
					<app-form-group class="my-1" v-model="form.nom" :error="error.nom" :label="$t('Nom')" :placeholder="$t('Nom de famille')" required />
					<app-form-group class="my-1" v-model="form.prenom" :error="error.prenom" :label="$t('Prenom')" :placeholder="$t('Prenom de l\'apprenant')" />
					<app-form-group class="my-1" v-model="form.email" :error="error.email" :label="$t('Email')" :placeholder="$t('Adresse email de l\'apprenant')" required type="email" />
					<app-form-group class="my-1" v-model="form.tel" :error="error.tel" :label="$t('Téléphone')" :placeholder="$t('Numéro de téléphone de l\'apprenant')" required type="tel" />
				</app-fieldset>
			</b-col>
			<b-col lg="6">
				<app-fieldset :title="$t('Supplement')" class="my-1">
					<app-form-group class="my-1" v-model="form.date_naiss" :error="error.date_naiss" :label="$t('Date de naissance')" :placeholder="$t('Date de naissance')" type="date" />
					<app-form-group 
						v-model="form.sexe" 
						class="my-1" type="select"
						:error="error.sexe" 
						:label="$t('sexe.title')" 
						:placeholder="$t('sexe.title')" 
						:options="['f', 'm', 'autre'].map(e => ({ text: $t(`sexe.${e}`), value: e }))" 
					/>
					<app-form-group 
						v-model="form.adresse" 
						class="my-1" type="address" 
						:error="error.adresse" 
						:label="$t('Lieu de résidence')" 
						:placeholder="$t('Veuillez renseigner l\'adresse de residence de l\'apprenant')"
						@address:selected="onAddressSelected"
					/>
				</app-fieldset>
			</b-col>
		</b-row>
		
        <div class="w-100 d-flex justify-content-center flex-end mt-10">
            <app-button :text="$t('Annuler')" variant="danger" class="me-2" @click.prevent="emit('reset')" />
            <app-button type="submit" :text="$t(action === 'create' ? 'Ajouter' : 'Modifier')" :loading="submitted" />
        </div>
    </b-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useForm } from '@inertiajs/inertia-vue3'

import { $alert, $toast } from '@/utils/alert'
import { $t } from '@/plugins/i18n'

defineOptions({ name: 'FormApprenant' })

const emit = defineEmits(['completed', 'reset'])

defineProps({
    action: { required: true, type: String },
    item: { default: null, type: [Object, null] },
})

const submitted = ref(false)

const post = {
    adresse: null,
    // eslint-disable-next-line camelcase
    code_postal: null,
    country: null, // different de pays, (ceci est le nom, tandis que pays est le code)
    // eslint-disable-next-line camelcase
    date_naiss: null,
    email: null,
    etat: null,
    nom: null,
    pays: null, // code du pays
    prenom: null,
    sexe: null,
    tel: null,
	ville: null,
}
const form = useForm({ ...post })
const error = reactive({ ...post })



function onAddressSelected({ city, country, country_code, postcode, state }) {
    // eslint-disable-next-line camelcase
    form.code_postal = postcode
    form.country = country
    form.etat = state
    // eslint-disable-next-line camelcase
    form.pays = country_code
    form.ville = city
}

function submitForm() {
	form.transform(data => {
		if (null !== data.adresse) {
			data.adresse = {
				adresse: data.adresse,
				// eslint-disable-next-line camelcase
				code_postal: data.code_postal || '',
				country: data.country || '',
				etat: data.etat || '',
				pays: data.pays || '',
				ville: data.ville || '',
			}
		}

		return data
	// eslint-disable-next-line no-undef
	}).post(route('admin.apprenants.store'), {
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
				$alert.error($t('Une erreur s\'est produite'))
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
