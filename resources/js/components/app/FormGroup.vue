<template>
    <b-form-group v-bind="formGroupAttrs">
		<template #label>
			{{ label }} <small v-if="required" class="text-danger">*</small>
		</template>
        
		<app-select v-if="type === 'select'" v-model="modelValue" v-bind="selectAttrs"> </app-select>
        <app v-else-if="type === 'checkbox'" v-model="modelValue" v-bind="checkboxAttrs" />
        <app-address-input v-else-if="type === 'address'" v-model="modelValue" v-bind="addressAttrs" @address:selected="(selected) => emit('address:selected', selected)" />
        <app-date-input v-else-if="isTypeDate" v-model:value="modelValue" v-bind="dateAttrs" />
        <b-form-textarea v-else-if="type === 'textarea'" v-model="modelValue" v-bind="textareaAttrs" />
		<b-form-input v-else v-model="modelValue" v-bind="inputAttrs" />

        <b-form-invalid-feedback v-if="error != null" class="d-inline my-1">{{ error }}</b-form-invalid-feedback>
    </b-form-group>
</template>

<script setup>
import { computed } from 'vue'
import { empty } from 'php-in-js/modules/types'

defineOptions({ name: 'AppFormGroup' })

const modelValue = defineModel({ type: String })

const emit = defineEmits(['update:modelValue', 'address:selected'])

const props = defineProps({
    autofocus: { default: false, type: Boolean },
    description: { default: '', type: String },
    disabled: { default: false, type: Boolean },
    error: { default: null, type: [String, null] },
    floating: { default: false, type: Boolean },
    invalidFeedback: { default: null, type: [String, null] },
    label: { required: true, type: String },
    labelClass: { default: '', type: String },
    list: { default: null, type: [String, null] },
    maxRows: { default: 6, type: Number },
    noResize: { default: false, type: Boolean },
    options: { default: () => [], type: Array },
    placeholder: { default: '', type: String },
    readonly: { default: false, type: Boolean },
    reducer: { default: null, type: [Function, null] },
    required: { default: false, type: Boolean },
    rows: { default: 2, type: Number },
    searchable: { default: false, type: Boolean },
    selectKey: { default: 'label', type: String },
    selectMultiple: { default: false, type: Boolean },
    selector: { default: 'value', type: String },
    size: { default: 'md', type: String },
    state: { default: null, type: [Boolean, null] },
    type: { default: 'text', type: String },
    validFeedback: { default: null, type: [String, null] },
})

const inputAttrs = computed(() => ({
    autofocus: props.autofocus,
	class: { 'border-danger': error.value != null },
    disabled: props.disabled,
    id: id.value,
    list: props.list,
    placeholder: props.placeholder,
    readonly: props.readonly,
    required: props.required,
    type: props.type,
}))
const addressAttrs = computed(() => ({
    disabled: props.disabled,
    id: id.value,
    placeholder: props.placeholder,
    required: props.required,
    state: error.value === null ? null : false,
    type: props.type,
}))
const checkboxAttrs = computed(() => ({
    disabled: props.disabled,
    isInvalid: error.value != null,
    label: props.selectKey,
    multiple: props.selectMultiple,
    options: props.options,
    reducer: props.reducer,
    required: props.required,
    selector: props.selector,
    state: props.state,
}))
const dateAttrs = computed(() => ({
    disabled: props.disabled,
    error: error.value,
    // label: props.selectKey,
    multiple: props.selectMultiple,
    placeholder: props.placeholder,
    range: props.type.includes('-range'),
    required: props.required,
    type: props.type.replace('-range', ''),

    // clearable: { default: true, type: Boolean },
    // editable: { default: true, type: Boolean },
}))
const selectAttrs = computed(() => ({
    disabled: props.disabled,
    error: error.value,
    label: props.selectKey,
    multiple: props.selectMultiple,
    options: props.options,
    placeholder: props.placeholder,
    reducer: props.reducer,
    required: props.required,
    searchable: props.searchable,
    selector: props.selector,
    state: props.state,
}))
const textareaAttrs = computed(() => ({
	autofocus: props.autofocus,
    class: { 'border-danger': error.value != null },
    disabled: props.disabled,
    id: id.value,
    maxRows: props.maxRows,
	noResize: props.noResize,
    placeholder: props.placeholder,
    readonly: props.readonly,
    required: props.required,
	rows: props.rows,
	size: props.size,
}))
const formGroupAttrs = computed(() => ({
    description: props.description,
    floating: props.floating,
    label: props.label,
    labelClass: props.labelClass,
    labelFor: id.value,
    state: props.state,
    validFeedback: props.validFeedback,
}))

const id = computed(() => props.label.toLocaleLowerCase().replace(/\s+/g, '-'))

const isTypeDate = computed(() => ['date', 'time', 'datetime', 'date-range', 'time-range', 'datetime-range'].includes(props.type))

// eslint-disable-next-line @stylistic/js/no-extra-parens
const error = computed(() => (!empty(props.error) ? props.error : props.invalidFeedback))
</script>

<style>
</style>
