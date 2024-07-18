import { reactive } from 'vue'

import { $storage } from '@/plugins/storage'
import { AVAILABLE_LOCALES } from './constants'

/**
 * Recupere la langue a utilier par defaut
 * 
 * @return {String}
 */
export function findLocale() {
	let lang = $storage.cookie.get('locale')

	if (lang == null || lang == undefined || !lang || typeof lang == 'undefined') {
		lang = (window.navigator.language || window.navigator.userLanguage || window.navigator.browserLanguage).substr(0,2).toLowerCase()
	}

	if (!AVAILABLE_LOCALES.includes(lang)) {
		lang = import.meta.env.VITE_DEFAULT_LOCALE || 'fr'
	}

	return lang
}

/**
 * Regroupe un tableau d'objet par cle
 * 
 * @param {Object[]} array 
 * @param {String} key 
 * @returns {Object}
 */
export function groupBy(array, key) {
    return array.reduce(function(r, a) {
        r[a[key]] = r[a[key]] || []
        r[a[key]].push(a)
        
        return r
    }, Object.create(null))
}

/**
 * Genere un objet reactif "form" et l'objet "error" associé pour la gestion des erreurs
 *
 * @param { Object<T> } target
 * @returns { {error: UnwrapNestedRefs<T>, form: UnwrapNestedRefs<TForm>} }
 */
export function generateReactiveForm(target) {
	const error = resetErrorObject(target)

	return {
		error: reactive(error),
		form: reactive(target),
	}
}

/**
 * Defini toutes les cles d'un objet a null
 * Necessaire pour reinitialiser les erreurs de formulaire lorsqu'on re-soumet le formulaire
 *
 * @param { Object<T> } target
 * @returns { Object<T> }
 */

export function resetErrorObject(target) {
	for (const key in target) {
		target[key] = null
	}

	return { ...target }
}


/**
 * Format bytes as human-readable text.
 * 
 * @param {Number} bytes Number of bytes.
 * @param {Boolean} si True to use metric (SI) units, aka powers of 1000. False to use binary (IEC), aka powers of 1024.
 * @param {Number} dp Number of decimal places to display.
 * 
 * @return {String} Formatted string.
 */
export function humanFileSize(bytes, si = true, dp = 1) {
	const thresh = si ? 1000 : 1024
  
	if (Math.abs(bytes) < thresh) {
	  	return bytes + ' B'
	}
  
	const units = si 
	  	? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
	  	: ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
	
	let u = -1
	const r = 10**dp
  
	do {
	  bytes /= thresh
	  ++u
	} while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1)
  
	return bytes.toFixed(dp) + ' ' + units[u]
}
