import { Inertia } from '@inertiajs/inertia'
import { throttle } from 'underscore'

export function handleSearch(routeName, { limit, search }) {
	throttle(function() {
		const query = { limit, search }

		// eslint-disable-next-line no-undef
		Inertia.get(route(routeName, query), {}, {
			preserveState: true,
			replace: true,
		})
	}, 500)()
}
