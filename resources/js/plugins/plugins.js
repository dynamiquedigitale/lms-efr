/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */

import { Head, Link } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'

import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import { createBootstrap } from 'bootstrap-vue-next'

import 'vue-select/dist/vue-select.css'
import vSelect from 'vue-select'

InertiaProgress.init({ color: '#4B5563', showSpinner: true })

export default function(app) {
	app.component('Head', Head)
	app.component('Link', Link)

	app.use(createBootstrap())

	app.component('VSelect', vSelect)
	
	return app
}
