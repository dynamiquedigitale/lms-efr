<template>
    <date-picker v-model="modelValue" v-bind="allAttrs" class="app-date-input" />
</template>

<script setup>
import 'vue-datepicker-next/index.css'
// import 'vue-datepicker-next/locale/fr'

import { computed } from 'vue'
import DatePicker from 'vue-datepicker-next'
// import { reactive } from 'vue'

defineOptions({ name: 'AppDateInput' })

const modelValue = defineModel({ type: [String, Object] })

defineEmits(['update:modelValue'])

const props = defineProps({
    disabled: { default: false, type: Boolean },
    editable: { default: true, type: Boolean },
    format: { default: 'DD MMMM YYYY', type: String },
    multiple: { default: false, type: Boolean },
    placeholder: { default: '', type: String },
    range: { default: false, type: Boolean },
    type: { default: 'date', type: String },
    unclear: { default: false, type: Boolean },
})

const allAttrs = computed(() => ({
    ...props,
    clearable: !props.unclear,
    format: props.format,
    inputClass: 'form-control',
    // lang: 'fr',
    titleFormat: 'DD MMMM YYYY',
    valueType: 'YYYY-MM-DD',
}))
</script>

<style scoped>
.app-date-input {
    width: 100% !important;
}
</style>
