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
