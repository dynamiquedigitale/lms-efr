import { ZygotVue }  from 'zygot'

export default function(app) {
	const config = typeof Zygot !== 'undefined' ? Zygot : globalThis?.Zygot
	if (!config.defaults) {
		config.defaults = {}
	}

	config.defaults.routeNamePrefix = import.meta.env.VITE_ZYGOT_ROUTENAME_PREFIX || ''

	app.use(ZygotVue, config)
	
	return app
}
