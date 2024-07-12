<template>
    <i v-if="type === 'fe'" :class="classes" :data-feather="name"></i>
	<i v-else-if="type === 'fa'" :class="classes"></i>
</template>

<script setup>
import { computed, onMounted } from 'vue'

defineOptions({ name: 'AppIcon' })
const props = defineProps({
    class: { default: '', type: String },
    name: { required: true, type: String },
	size: { default: '', type: String },
	type: { default: 'fe', type: String },
	variant: { default: '', type: String },
})

const classes = computed(() => {
	const cls = props.class.split(' ')
	if (props.type === 'fa') {
		cls.unshift(`fa fa-${props.name}`)
	}
	if (props.variant !== '') {
		cls.push(`text-${props.variant}`)	
	}
	if (props.size !== '') {
		cls.push(`fa-${props.size}`)	
	}

	return cls.join(' ')
})

onMounted(() => {
	// eslint-disable-next-line no-undef
	if (feather && props.type === 'fe') {
		// eslint-disable-next-line no-undef
        feather.replace({ height: 14, width: 14 })
	}
})
</script>

<style></style>
