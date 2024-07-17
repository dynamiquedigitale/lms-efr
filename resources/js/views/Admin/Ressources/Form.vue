<template>
	<div class="d-flex justify-content-center">
		<b-button-toolbar key-nav>
			<b-button-group class="me-1 view-toggle">
				<app-button icon="grid" size="sm" class="p-50" variant="outline-primary" :class="{active: uploaderTheme === 'default'}" @click.prevent="uploaderTheme = 'default'" text="Grille" />
				<app-button icon="list" size="sm" class="p-50" variant="outline-primary" :class="{active: uploaderTheme === 'list'}" @click.prevent="uploaderTheme = 'list'" text="Liste" />
			</b-button-group>
			<b-button-group class="ms-1">
				  <app-button icon="trash" size="sm" class="p-50" variant="danger" text="Retirer tous" />
			</b-button-group>
		</b-button-toolbar>
	</div>
	
	<app-file-uploader 
		multiple editable deletable
		class="mt-2 mb-3"
		accept="image/*,video/*,.pdf,.doc,.docx,.xlsx,.xls,.csv,.ppt,.pptx,audio/*"
		:theme="uploaderTheme"
		@input:native="onFileSelect"
	/>
	
	<div class="w-100 d-flex justify-content-center flex-end mt-10">
		<app-button :text="$t('action.annuler')" variant="danger" class="me-2" @click.prevent="emit('reset')" />
		<app-button :text="$t('action.ajouter')" :loading="submitted" @click.prevent="submitForm"/>
	</div>
</template>

<script setup>
import { Inertia } from '@inertiajs/inertia'
import { ref } from 'vue'

import { $alert, $toast } from '@/utils/alert'
import { $t } from '@/plugins/i18n'

defineOptions({ name: 'FormRessource' })

const emit = defineEmits(['reset', 'completed'])

const uploaderTheme = ref('default')
const submitted = ref(false)
const files = ref([])

function onFileSelect($event) {
	files.value = [...$event]
	console.log({ files: files.value })
}

function submitForm() {
	const data = [...files.value].map(f => ({
		ext     : f.ext,
		mime    : f.type,
		nom     : f.name,
		size    : f.size,
		sizeText: f.sizeText,
		upload  : f.file,
	}))

	// eslint-disable-next-line no-undef
	Inertia.post(route('admin.ressources.store'), { files: data }, {
		onError(errors) {
			if (errors.default) {
				$alert.error(errors.default)
			} else if (Object.keys(errors).length) {
				$alert.error('Un ou plusieurs fichiers invalide')
			} else {
				$alert.error($t('une_erreur_s_est_produite'))
			}
		},
		onFinish() {
			submitted.value = false
		},
		onStart() {
			submitted.value = true		
		},
		onSuccess({ props }) {
			$toast.success(props.flash.success)
			
			emit('completed')
    	},
	})
}
</script>
