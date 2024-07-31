<template>
    <b-alert :model-value="true" class="text-center py-2">
        <slot name="icon">
			<app-icon name="exclamation-circle" variant="danger" type="fa" size="4x" />
		</slot>
        <br />
        <app-button v-if="action !== null && btnPosition === 'top'" :text="btnText" @click="action" variant="secondary" class="mb-2" />
        <h3 class="my-2 fw-bold">{{ trim(message, '.') }}. {{ instruction }}</h3>
        <app-button v-if="action !== null && btnPosition === 'bottom'" :text="btnText" @click="action" variant="secondary" class="mt-2" />
    </b-alert>
</template>

<script setup>
import { computed } from 'vue'
import { trim } from 'php-in-js/modules/string'

import { $t } from '@/plugins/i18n'

defineOptions({ name: 'AppEmptyItems' })

const props = defineProps({
    action: { default: null, type: [null, Function] },
    btnPosition: { default: 'bottom', type: String, validator: (value) => ['bottom', 'top'].includes(value) },
    btnText: { default: null, type: [null, String], validator: (value, props) => props.action !== null ? (value !== null && value !== '') : true },
    instruction: { default: null, type: [null, String] },
    message: { required: true, type: String },
})

const instruction = computed(() => {
    if (props.instruction !== null) {
        return props.instruction
    }
	if (props.action === null) {
		return ''
	}
    if (props.btnPosition == 'top') {
        return  $t('Vous pouvez en ajouter via le bouton ci-dessous')
    }
    return $t('Vous pouvez en ajouter via le bouton ci-dessus')
})

</script>
