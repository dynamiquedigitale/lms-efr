<template>
	<fieldset class="border p-2 pt-0">
   		<legend class="float-none w-auto px-2">{{ title }}</legend>
		<slot />
	</fieldset>
</template>

<script setup>
defineOptions({ name: 'AppFieldset' })

defineProps({
	title: { required: true, type: String },
})
</script>
