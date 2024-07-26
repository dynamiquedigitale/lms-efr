<template>
	<editor
		v-model="modelValue"
		tinymce-script-src="/lib/tinymce/tinymce.min.js"
		:init="{
			language           : lang,
			language_url       : `/lib/tinymce/langs/${lang}.js`,
			plugins            : 'lists link autolink image table help emoticons fullscreen save media searchreplace preview insertdatetime',
			link_default_target: '_blank',
			toolbar            : 'undo redo | blocks | save fullscreen preview | bold italic underline | alignleft aligncentre alignright alignjustify | indent outdent | bullist numlist | help',
			removed_menuitems  : 'help newdocument print fullscreen visualaid codeformat preview',
			branding           : false,
			promotion          : false,
			statusbar          : false,
			height             : height,
			placeholder        : placeholder,
			readonly           : readonly,
			resize             : resize,
			save_onsavecallback: () => emit('save', modelValue),
		}"
	/>
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue'

defineOptions({ name: 'EfrEditor' })

defineProps({
	height: { default: 400, type: [Number, String] },
	lang: { default: 'fr_FR', type: String },
	placeholder: { default: 'Saisissez ici...', type: String },
	readonly: { default: false, type: Boolean },
	resize: { default: false, type: [Boolean, String], validator: (value) => typeof value === 'boolean' ? true : value === 'both' },
})

const modelValue = defineModel({ type: String })

const emit = defineEmits(['update:modelValue', 'save'])
</script>
