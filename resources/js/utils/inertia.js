import { Inertia } from '@inertiajs/inertia'
import { throttle } from 'underscore'

export function handleSearch(routeName, query) {
	throttle(function() {
		// eslint-disable-next-line no-undef
		Inertia.get(route(routeName, query), {}, {
			preserveState: true,
			replace: true,
		})
	}, 500)()
}
