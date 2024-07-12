<template>
	<b-modal
		v-model="modelValue" 
		:id="id" :size="size" :fullscreen="fullscreen" no-close-on-backdrop no-close-on-esc
		:scrollable="scrollable" :hide-footer="noFooter" :hide-header="noHeader" 
		@ok="handleOk" @hide.prevent
		@close="handleHidden">
		<template #title>
			<slot v-if="empty(title)" name="title" />
			<div v-else v-html="title"></div>
		</template>
		<template #footer="{ ok, close }">
			<slot name="footer" v-bind="slotScope">
				<app-button :disabled="disabled || submitted" :size="buttonSize" v-if="!okOnly" :text="titleCancel" :variant="cancelVariant" @click.prevent="close()" />
				<app-button :disabled="disabled || submitted" :size="buttonSize" v-if="!cancelOnly" :text="titleOk" :variant="okVariant" @click.prevent="ok()" :loading="submitted" /> 
			</slot>
		</template>
		<slot />
	</b-modal>
</template>

<script setup>
import { computed, onMounted, onUpdated, ref } from 'vue'
import { empty } from 'php-in-js/modules/types'
import { useModal } from 'bootstrap-vue-next'

import { $t } from '@/plugins/i18n'

defineOptions({ name: 'AppModal' })

const modelValue = defineModel({ type: Boolean })

const emit = defineEmits(['close', 'ok', 'update:modelValue'])

const props = defineProps({
	buttonSize: { default: 'sm', type: String },
	cancelOnly: { default: false, type: Boolean },
	cancelTitle: { default: null, type: String },
	cancelVariant: { default: 'secondary', type: String },
	disabled: { default: false, type: Boolean },
	fullscreen: { default: false, type: Boolean },
	id: { required: true, type: String },
	noFooter: { default: false, type: Boolean },
	noHeader: { default: false, type: Boolean },
	okOnly: { default: false, type: Boolean },
	okTitle: { default: null, type: String },
	okVariant: { default: 'primary', type: String },
	scrollable: { default: false, type: Boolean },
	size: { default: 'md', type: String },
	submitted: { default: false, type: Boolean },
	title: { default: '', type: String },
})

const modal = useModal(props.id)

const titleCancel = ref('')
const titleOk = ref('')

const slotScope = computed(() => ({
	close: () => modal.hide(),
}))

onMounted(() => {
	retriveTitle()
})

onUpdated(() => {
	retriveTitle()
})

function handleHidden() {
	emit('close')
	emit('update:modelValue', false)
}

function handleOk(btvEvt) {
	emit('ok', btvEvt)
}

function retriveTitle() {
	titleCancel.value = JSON.parse(JSON.stringify(props.cancelTitle))
	if (empty(titleCancel.value)) {
		titleCancel.value = $t(props.cancelOnly === true ? 'Fermer' : 'Annuler')
	}

	titleOk.value = JSON.parse(JSON.stringify(props.okTitle))
	if (empty(titleOk.value)) {
		titleOk.value = $t('Valider')
	}
}
</script>

<style></style>
