import fluidStorage from 'fluid-storage'

import { APP_ID } from '@/utils/constants'

export const storage = {
    cookie : fluidStorage.init(APP_ID, 'cookie'),
    local  : fluidStorage.init(APP_ID, 'localstorage'),
    session: fluidStorage.init(APP_ID, 'sessionstorage'),
}

export const $storage = storage

export default function(app) {
    app.use({
		install(Vue) {
            Vue.storage = storage

            if (!Object.prototype.hasOwnProperty.call(Vue, '$storage')) {
    			Vue.$storage = storage
            }
		},
	})

    return app
}
