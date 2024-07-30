export const STATUT = {
	ACTIVE     : 'active',
	COMPLETE   : 'complete',
	COMPLETED  : 'completed',
	IN_PROGRESS: 'in-progress',
	INACTIVE   : 'inactive',
	INCOMPLETE : 'incomplete',
	INVALID    : 'invalid',
	PENDING    : 'pending',
	SUSPENDED  : 'suspended',
	UNPAID     : 'unpaid',
	VALID      : 'valid',
	
	// eslint-disable-next-line sort-keys
	percentageVariant,
	variant,
}

export const NIVEAU = {
	AVANCE  : 'avance',
	DEBUTANT: 'debutant',
	EXPERT  : 'expert',
	MOYEN   : 'moyen',
}

/**
 * Variant en fonction du statut
 * 
 * @param {String} statut
 * @returns {String}
 */
function variant(statut) {
	switch (statut) {
		case STATUT.VALID:
		case STATUT.ACTIVE:
		case STATUT.COMPLETE:
		case NIVEAU.DEBUTANT:
			return 'success'
		case STATUT.INACTIVE:
		case STATUT.INVALID:
		case STATUT.INCOMPLETE:
		case NIVEAU.EXPERT:
			return 'danger'
		case STATUT.UNPAID:
		case STATUT.PENDING:
		case NIVEAU.AVANCE:
			return 'warning'
		case NIVEAU.MOYEN:
			return 'info'
		default:
			return 'light'
	}
}

/**
 * Variant en fonction d'un pourcentage
 * 
 * @param {Number} percentage
 * @returns {String}
 */
function percentageVariant(percentage) {
	if (percentage < 30) {
		return 'danger'
	}
	if (percentage < 70) {
		return 'warning'
	}

	return 'success'
}
