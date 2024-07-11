<template>
    <app-header />
    <app-menu />

    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <slot />
    </div>
    <app-customizer />
    <div class="sidenav-overlay"></div>
    <div class="drag-target"></div>
    <app-footer />
</template>

<script setup>
defineOptions({ name: 'MainLayout' })

import { onMounted, onUpdated } from 'vue'

import AppCustomizer from './partials/Customizer.vue'
import AppFooter from './partials/Footer.vue'
import AppHeader from './partials/Header.vue'
import AppMenu from './partials/Menu.vue'

onMounted(() => {
	initFeather()
	initApp()
})
onUpdated(() => {
	initFeather()
})

const initFeather = () => {
	if (feather) {
        feather.replace({ height: 14, width: 14 })
	}
}
</script>
