/* eslint-disable no-undef */
import { ltrim, rtrim } from 'php-in-js/modules/string'

export default function(app) {
	app.use({
		install(app) {
			app.config.globalProperties.$public = (path) => {
				let base = null
				if (Zygot) {
					base = Zygot.url || null
				}
				if (!base) {
					// eslint-disable-next-line prefer-destructuring
					base = window.location.origin
				}
				
				return `${rtrim(base, '/')}/${ltrim(path, '/')}`
			}

			app.config.globalProperties.$asset = (path) => {
				return new URL(`../assets/${path}`, import.meta.url).href
			}
		},
	})

	return app
}
