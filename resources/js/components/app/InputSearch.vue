<template>
	<b-input-group class="input-group-merge">
		<b-input-group-text><app-icon name="search" /></b-input-group-text>
		<b-form-input 
			v-model="modelValue" 
			@keyup="(e) => emit('keyup', e)" 
			@keypress="(e) => emit('keypress', e)" 
			@keydown="(e) => emit('keydown', e)" 
			:placeholder="placeholder" 
		/>
	</b-input-group>
</template>

<script setup>
import { $t } from '@/plugins/i18n'

defineOptions({ name: 'AppInputSearch' })

const modelValue = defineModel({ type: String })

const emit = defineEmits(['update:modelValue', 'keyup', 'keypress', 'keydown'])

defineProps({
    disabled: { default: false, type: Boolean },
    placeholder: { default: $t('rechercher'), type: String },
})

</script>
