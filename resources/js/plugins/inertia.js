/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */

import { Head, Link } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'

InertiaProgress.init({ color: '#4B5563' })

export default function(app) {
	app.component('Head', Head)
	app.component('Link', Link)

	return app
}
