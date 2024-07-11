<template>
    <b-button v-bind="allprops" v-b-tooltip="tooltip">
        <template v-if="props.loading">
			<span class="spinner-border spinner-border-sm align-middle me-25" role="status" v-if="!props.iconEnd"></span>
			<span class="align-middle">{{ props.indicator }}</span>
			<span class="spinner-border spinner-border-sm align-middle ms-25" role="status" v-if="props.iconEnd"></span>
		</template>
		<template v-else>
			<app-icon v-if="props.icon !== '' && !props.iconEnd" :name="props.icon" :class="`me-1 ${props.iconClass}`" />
            <template v-if="!props.tooltip">{{ props.text }}</template>
            <app-icon v-if="props.icon !== '' && props.iconEnd" :name="props.icon" :class="`ms-1 ${props.iconClass}`" />
		</template>
    </b-button>
</template>

<script setup>
import { computed } from 'vue'
import { is_object } from 'php-in-js/modules/types'

defineOptions({ name: 'AppButton' })

const props = defineProps({
    block: { default: false, type: Boolean },
    disabled: { default: false, type: Boolean },
    icon: { default: '', type: String },
    iconClass: { default: '', type: String },
    iconEnd: { default: false, type: Boolean },
    indicator: { default: 'Veuillez patientez...', type: String },
    loading: { default: false, type: Boolean },
    pill: { default: false, type: Boolean },
    pressed: { default: null, type: [Boolean, null] },
    size: { default: 'md', type: String, validator: (value) => ['sm', 'md', 'lg'].includes(value) },
    squared: { default: false, type: Boolean },
    text: { required: true, type: String },
    tooltip: { default: false, type: [Boolean, Object] },
    type: { default: 'button', type: String, validator: (value) => ['submit', 'button', 'reset'].includes(value) },
    variant: { default: 'primary', type: String },
})

const allprops = computed(() => {
    const _props = { ...props }

    if (props.loading) {
        _props.disabled = true
    }

    delete _props.text
    delete _props.indicator
    delete _props.loading
    delete _props.icon
    delete _props.iconClass
    delete _props.iconEnd
    delete _props.tooltip

    return _props
})

const tooltip = computed(() => {
    let tip = {
        delay: 0,
        placement: 'auto',
        title: '',
        trigger: 'hover',
    }
    if (props.tooltip === true) {
        // eslint-disable-next-line prefer-destructuring
        tip.title = props.text
    } else if (is_object(props.tooltip)) {
        tip = { ...tip, ...props.tooltip, title: props.text }
    }

    return tip
})
</script>
