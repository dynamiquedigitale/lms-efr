export default [
	{
		icon: 'home',
		route: 'admin.home',
		text: 'Tableau de bord',
	},
	{
		divider: true,
		text: 'Academie',
	},
	{
		icon: 'briefcase',
		route: 'formations.index',
		text: 'Formations',
	},
	{
		icon: 'book',
		route: 'lecons.index',
		text: 'Leçons',
	},
	{
		icon: 'save',
		route: 'ressources.index',
		text: 'Ressources',
	},
	{
		icon: 'book-open',
		route: 'parcours.index',
		text: 'Parcours',
	},
	{
		divider: true,
		text: 'Utilisateurs',
	},
	{
		icon: 'user-check',
		route: 'admin.enseignants.index',
		text: 'Enseignants',
	},
	{
		icon: 'user',
		route: 'admin.apprenants.index',
		text: 'Apprenants',
	},
	{
		icon: 'users',
		route: 'administrateurs.index',
		text: 'Administrateurs',
	},
	{
		divider: true,
		text: 'Autres',
	},
	{
		icon: 'calendar',
		route: 'meetings.index',
		text: 'Meetings',
	},
	{
		icon: 'mail',
		route: 'messagerie.index',
		text: 'Messagerie',
	},
	{
		icon: 'dollar-sign',
		route: 'paiements.index',
		text: 'Paiements',
	},
]
