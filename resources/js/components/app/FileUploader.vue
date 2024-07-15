<template>
	<vue-file-agent 
		v-model="modelValue" 
		:auto="false"
		v-bind="attrs"
		@select="onFileSelect"
		@delete="emit('delete', $event)"
		@beforedelete="emit('beforedelete', $event)"
	/>
</template>

<script setup>
import { computed, ref } from 'vue'

import '@/assets/lib/vue-file-agent-next/vue-file-agent-next.css'
import { VueFileAgent } from '@/assets/lib/vue-file-agent-next/vue-file-agent-next.es'

defineOptions({ name: 'AppFileUploader' })

const modelValue = ref([])

const emit = defineEmits(['update:modelValue', 'select', 'delete', 'beforedelete'])

const props = defineProps({
	accept     : { default: '', type: String },
	capture    : { default: undefined, type: String },
	compact    : { default: false, type: Boolean },
	deletable  : { default: true, type: Boolean },
	disabled   : { default: false, type: Boolean },
	editable   : { default: false, type: Boolean },
	error      : { default: null, type: Object },        // errorText
	linkable   : { default: false, type: Boolean },
	maxFiles   : { default: null, type: Number },
	maxSize    : { default: null, type: Number },
	multiple   : { default: false, type: Boolean },
	placeholder: { default: null, type: String },          // helpText
	readonly   : { default: false, type: Boolean },
	theme      : { default: null, type: String },
})

const attrs = computed(() => {
	const _props = { ...props }
	if (_props.placeholder) {
		// eslint-disable-next-line prefer-destructuring
		_props.helpText = _props.placeholder
		delete _props.placeholder
	}
	if (_props.error) {
		// eslint-disable-next-line prefer-destructuring
		_props.errorText = _props.error
		delete _props.error
	}

	for (const key in _props) {
		if (!_props[key]) {
			delete _props[key]
		}
	}

	return _props
})

function onFileSelect($event) {
	let files = $event.map(({ file }) => file)
	
	if (!props.multiple) {
		files = files.shift()
	}

	emit('update:modelValue', files)
	emit('select', files)
}
</script>
