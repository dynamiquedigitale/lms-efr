<template>
    <i :class="props.class" :data-feather="name"></i>
</template>

<script setup>
import { onMounted } from 'vue'

defineOptions({ name: 'AppIcon' })
const props = defineProps({
    class: { default: '', type: String },
    name: { required: true, type: String },
})

onMounted(() => {
	// eslint-disable-next-line no-undef
	if (feather) {
		// eslint-disable-next-line no-undef
        feather.replace({ height: 14, width: 14 })
	}
})
</script>

<style></style>
