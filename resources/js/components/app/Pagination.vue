<template>
	<b-container v-if="props.total > 0">
		<span v-if="props.noControl === false" class="w-100 text-center text-muted d-inline-block text-small mb-1">
			{{ $t('Affichage de XY sur Z elements', {x: offset, y: last, z: total }) }}
		</span>
		<nav class="d-flex align-items-center justify-content-center">
			<ul class="pagination">
				<li class="page-item prev" :class="{disabled: props.prev == null}">
					<Link class="page-link" :href="props.prev"><i class="tf-icon bx bx-chevron-left"></i></Link>
				</li>
				<li class="page-item" :class="{'active': link.active}" v-for="(link, i) in computedLinks" :key="i">
					<Link class="page-link" :href="link.url">{{ link.label }}</Link>
				</li>
				<li class="page-item next" :class="{disabled: props.next == null}">
					<Link class="page-link" :href="props.next"><i class="tf-icon bx bx-chevron-right"></i></Link>
				</li>
			</ul>
		</nav>
	</b-container>
</template>

<script setup>
import { computed, ref } from 'vue'

defineOptions({ name: 'AppPagination' })

const props = defineProps({
	from: { default: null, type: Number },
    hr: { default: false, type: [String, Boolean] },
	links: { required: true, type: Array },
	modelValue: { default: 20, type: Number },
    next: { default: '', type: String },
	noControl: { default: false, type: Boolean },
    prev: { default: '', type: String },
	range: { default: () => [5, 10, 20, 30, 50, 100], type: Array },
	size: { default: 'md', type: [Number, String] },
	to: { default: null, type: Number },
	total: { required: true, type: Number },
})

// const emit = defineEmits(['update:modelValue'])

const limiter = ref(props.modelValue)
const current = ref(1)

const computedLinks = computed(() => {
	const links = [...props.links]
    links.shift()
    links.pop()
	
    return links
})
const offset = computed(() => {
	if (props.from) {
		return props.from
	}

	return ((current.value * limiter.value) - limiter.value) + 1
})
const last = computed(() => {
	if (props.to) {
		return props.to
	}
	const l = offset.value + limiter.value
	if (l > props.total) {
		return props.total
	}
	return l
})

/*
const dropdownText = computed(() => `${props.range.length < 2 ? props.range[0] : limiter.value}`)

function changeLimit(limit) {
	limiter.value = limit
	emit('update:modelValue', limit)
} 
*/
</script>
