<template>
	<vue-file-agent 
		v-model="modelValue"
		ref="fileAgent"
		:auto="false"
		v-bind="attrs"
		@select="onFileSelect"
		@delete="onDelete($event)"
		@beforedelete="onBeforeDelete($event)"
	/>
</template>

<script setup>
import { computed, reactive } from 'vue'

import '@/assets/lib/vue-file-agent-next/vue-file-agent-next.css'
import { VueFileAgent } from '@/assets/lib/vue-file-agent-next/vue-file-agent-next.es'

defineOptions({ name: 'AppFileUploader' })

const modelValue = reactive({ files: [] })

const emit = defineEmits([
	'update:modelValue', 
	'select', 'select:native', 
	'input', 'input:native', 
	'delete', 
])

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

function onFileSelect(record) {
	record           = [...record].map(({ raw }) => raw)
	modelValue.files = [...modelValue.files, ...record]
	
	if (!props.multiple) {
		modelValue.files = modelValue.files.pop()
		record = [...record].pop()
	}

	if (!props.multiple) {
		emit('update:modelValue', modelValue.files.file)
		emit('select', record.file)
		emit('input', modelValue.files.file)
		emit('select:native', record)
		emit('input:native', modelValue.files)
	} else {
		emit('update:modelValue', modelValue.files.map(({ file }) => file))
		emit('select', record.map(({ file }) => file))
		emit('input', modelValue.files.map(({ file }) => file))
		emit('select:native', record)
		emit('input:native', modelValue.files)
	}
}

function onDelete(record) {
	console.log({ record })
	// this.$refs.fileAgent.deleteUpload(/* ... */);
	
}

function onBeforeDelete(fileRecord){
	if (confirm('Are you sure?')){
		this.$refs.fileAgent.deleteFileRecord(fileRecord)
	}
}
</script>
