<template>
    <v-select
        v-model="modelValue"
        label="formatted"
        :filterable="false"
        :disabled="disabled"
        :placeholder="placeholder"
        :options="options"
        :reduce="(e) => e.formatted"
        @search="onSearch"
        @option:selected="(selected) => emit('address:selected', selected)"
        class="app-address-input"
        :class="{ 'is-invalid': state == false, 'is-valid': state == true }"
    >
        <template #no-options> Saisissez une adresse.. </template>
        <template #search="{ attributes, events }">
            <b-form-input class="border-0" v-bind="attributes" v-on="events" />
        </template>
    </v-select>
</template>

<script setup>
import { debounce } from 'underscore'
import { http_build_query } from 'php-in-js/modules/url'
import { ref } from 'vue'

defineOptions({ name: 'AppAddressInput' })

const modelValue = defineModel({ type: String })

const emit = defineEmits(['update:modelValue', 'address:selected'])

defineProps({
    disabled: { default: false, type: Boolean },
    placeholder: { default: '', type: String },
    state: { default: null, type: [Boolean, null] },
})

const options = ref([])

function onSearch(search, loading) {
    if (search.length) {
        loading(true)
        research(loading, search)
    }
}

const query = http_build_query({
    apiKey: '82fbbce5ae3e4cf2928303ebe1e8a170',
    format: 'json',
    lang: 'fr',
    limit: 15,
})

const research = debounce((loading, search) => {
    fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(search)}&${query}`).then((res) => {
        res.json().then(({ results }) => {
            options.value = results
        })
        loading(false)
    })
}, 350)
</script>

<style>
.app-address-input .vs__dropdown-toggle {
    border: 1px solid var(--bs-gray-300);
    border-radius: 0.475rem;
    padding: 0;
}
.app-address-input.is-invalid .vs__dropdown-toggle {
    --bs-border-opacity: 1;
    border-color: rgba(var(--bs-danger-rgb), var(--bs-border-opacity)) !important;
}
.app-address-input.is-valid .vs__dropdown-toggle {
    --bs-border-opacity: 1;
    border-color: rgba(var(--bs-success-rgb), var(--bs-border-opacity)) !important;
}
.app-address-input .form-control {
    width: 100%;
}
.app-address-input .vs__selected {
    color: var(--bs-gray-700);
}
.app-address-input .vs__selected + .form-control {
    width: auto !important;
}
.app-address-input .vs__open-indicator {
    display: none !important;
}
</style>
