<template>
    <b-form class="mt-1" @submit.prevent="submitForm" autocomplete="false" :disabled="submitted">
		<b-row class="mb-1">
			<b-col lg="6">
				<app-fieldset :title="$t('infos_de_base')" class="my-1">
					<app-form-group class="mb-1" v-model="form.nom" :error="error.nom" :label="$t('nom.title')" :placeholder="$t('nom.famille')" required />
					<app-form-group class="my-1" v-model="form.prenom" :error="error.prenom" :label="$t('prenom.title')" :placeholder="$t('prenom.enseignant')" />
					<app-form-group class="my-1" v-model="form.email" :error="error.email" :label="$t('email.title')" :placeholder="$t('email.enseignant')" required type="email" />
					<app-form-group class="mt-1" v-model="form.tel" :error="error.tel" :label="$t('tel.title')" :placeholder="$t('tel.enseignant')" required type="tel" />
				</app-fieldset>
			</b-col>
			<b-col lg="6">
				<app-fieldset :title="$t('supplements')" class="my-1">
					<app-form-group 
						v-model="form.sexe" 
						class="mb-1" type="select" required
						:error="error.sexe" 
						:label="$t('sexe.title')" 
						:placeholder="$t('sexe.title')" 
						:options="['f', 'm', 'autre'].map(e => ({ text: $t(`sexe.${e}`), value: e }))" 
					/>
					<app-form-group 
						v-model="form.adresse" 
						class="my-1" type="address" 
						:error="error.adresse" 
						:label="$t('lieu_residence.title')" 
						:placeholder="$t('lieu_residence.placeholder_enseignant')"
						@address:selected="onAddressSelected"
					/>
					<app-form-group 
						v-model="form.diplome" 
						class="my-1" type="select"
						:error="error.diplome" 
						:label="$t('diplome.title')" 
						:placeholder="$t('diplome.title')" 
						:options="['bac', 'bac1', 'bac2', 'licence', 'm1', 'm2', 'doctorat'].map(e => ({ text: $t(`diplome.${e}`), value: e }))" 
					/>
					<app-form-group v-model="form.specialite" class="mt-1" :error="error.specialite" :label="$t('specialite')" placeholder="Ex: Communication" />
				</app-fieldset>
			</b-col>
		</b-row>
		<app-fieldset :title="$t('autres_infos')" class="my-1">
			<b-row>
				<b-col lg="6" class="mb-1 mb-lg-0">
					<app-form-group v-model="form.taux_horaire" class="mb-1" :error="error.taux_horaire" :label="$t('taux_horaire.title')" :placeholder="$t('taux_horaire.placeholder')" required />
					<app-form-group 
						v-model="form.piece_identite" 
						class="my-1" type="select"
						:error="error.piece_identite" 
						:label="$t('piece_identite.title')" 
						:placeholder="$t('piece_identite.title')" 
						:options="['cni', 'passport'].map(e => ({ text: $t(`piece_identite.${e}`), value: e }))" 
					/>
					<app-form-group v-model="form.numero_identite" class="mt-1" :error="error.numero_identite" :label="$t(`numero_identite.${form.piece_identite || 'title'}`)" :placeholder="$t('numero_identite.placeholder')" />
				</b-col>
				<b-col lg="6">
					<b-form-group>
						<template #label>
							{{ $t('document_identite.title') }} <small class="text-danger">*</small>
						</template>
						<app-file-uploader 
							v-model="form.document" 
							accept="image/*"
							max-size="2MB"
							:placeholder="$t(`document_identite.placeholder_${form.piece_identite || 'title'}`)" 
						/>
						<b-form-invalid-feedback v-if="error.document != null" class="d-inline my-1">{{ error.document }}</b-form-invalid-feedback>
					</b-form-group>
				</b-col>
			</b-row>	
		</app-fieldset>
		
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

defineOptions({ name: 'FormEnseignant' })

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
    diplome: null,
	document: null,
    email: null,
    etat: null,
    nom: null,
	// eslint-disable-next-line camelcase
	numero_identite: null,
    pays: null, // code du pays
    // eslint-disable-next-line camelcase
	piece_identite: null,
    prenom: null,
    sexe: null,
	specialite: null,
    // eslint-disable-next-line camelcase
	taux_horaire: null,
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
			data.adresse = JSON.stringify({
				adresse    : data.adresse,
				// eslint-disable-next-line camelcase
				code_postal: data.code_postal || '',
				country    : data.country || '',
				etat       : data.etat || '',
				pays       : data.pays || '',
				ville      : data.ville || '',
			})
		}

		return data
	// eslint-disable-next-line no-undef
	}).post(route('admin.enseignants.store'), {
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
