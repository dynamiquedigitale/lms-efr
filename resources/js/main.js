import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'

import { APP_NAME } from './utils/constants'

import './assets/css/app.css'

import initPlugin from './plugins'
import MainLayout from './layouts/Main.vue'

createInertiaApp({
	async resolve(name) {
		const pages = import.meta.glob('./views/**/*.vue')
		const { default: page } =  await pages[`./views/${name}.vue`]()

		page.layout ??= MainLayout
    	return page
	},
	setup({ el, App, props, plugin }) {
		initPlugin(createApp({ render: () => h(App, props) }).use(plugin)).mount(el)
	},
	title: title => title ? `${title} - ${ APP_NAME }` : APP_NAME,
})
