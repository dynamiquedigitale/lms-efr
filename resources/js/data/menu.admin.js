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
		route: 'admin.formations.index',
		text: 'formations.title',
	},
	{
		icon: 'book',
		route: 'admin.lecons.index',
		text: 'lecons.title',
	},
	{
		icon: 'save',
		route: 'admin.ressources.index',
		text: 'ressources.title',
	},
	{
		icon: 'book-open',
		route: 'admin.parcours.index',
		text: 'parcours.title',
	},
	{
		divider: true,
		text: 'Utilisateurs',
	},
	{
		icon: 'user-check',
		route: 'admin.enseignants.index',
		text: 'enseignants.title',
	},
	{
		icon: 'user',
		route: 'admin.apprenants.index',
		text: 'apprenants.title',
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
		text: 'paiements.title',
	},
]
