<template>
    <date-picker v-model="modelValue" v-bind="allAttrs" class="app-date-input" />
</template>

<script setup>
import 'vue-datepicker-next/index.css'
// import 'vue-datepicker-next/locale/fr'

import { computed } from 'vue'
import DatePicker from 'vue-datepicker-next'

defineOptions({ name: 'AppDateInput' })

const modelValue = defineModel({ type: [String, Object] })

defineEmits(['update:modelValue'])

const props = defineProps({
	disabled   : { default: false, type: Boolean },
	editable   : { default: true, type: Boolean },
	format     : { default: null, type: String },
	max        : { default: null, type: [Date, Number, String] },
	min        : { default: null, type: [Date, Number, String] },
	multiple   : { default: false, type: Boolean },
	placeholder: { default: '', type: String },
	range      : { default: false, type: Boolean },
	type       : { default: 'date', type: String },
	unclear    : { default: false, type: Boolean },
})

const allAttrs = computed(() => {
	const attrs = { 
		...props,
		clearable      : !props.unclear,
		format         : props.format || formats[props.type],
		inputClass     : 'form-control',
		// lang           : 'fr',
		timeTitleFormat: 'HH:mm:ss',
		titleFormat    : 'DD MMMM YYYY',
		valueType      : 'format',
	}

	if (props.type === 'date') {
		attrs.valueType = 'YYYY-MM-DD'
	} else if (props.type === 'datetime') {
		attrs.valueType = 'YYYY-MM-DD HH:mm:ss'
	} else if (props.type === 'month') {
		attrs.valueType = 'MM'
	}

	return attrs
})

const formats = {
	date    : 'DD MMMM YYYY',
	datetime: 'DD MMMM YYYY - HH:mm:ss',
	month   : 'MMMM',
	time    : 'HH:mm:ss',
	year    : 'YYYY',
}
</script>

<style scoped>
.app-date-input {
    width: 100% !important;
}
</style>
