/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */

import { Head, Link } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'

import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import { createBootstrap } from 'bootstrap-vue-next'

InertiaProgress.init({ color: '#4B5563' })

export default function(app) {
	app.component('Head', Head)
	app.component('Link', Link)

	app.use(createBootstrap())
	
	return app
}
