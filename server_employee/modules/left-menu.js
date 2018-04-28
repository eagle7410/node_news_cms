const groups = require('../../constants/groups');

const store = [
	{
		name: 'profile',
		icon: 'fa fa-user-circle',
		path: '/admin/user-profile',
		isAllGroups : true,
	},
	{
		name: 'dashboard',
		icon: 'dashboard',
		path: '/admin/dashboard',
		groups: [groups.admin]
	},
	{
		name: 'employees',
		icon: 'fa fa-user-secret',
		path: '/admin/employees',
		groups: [groups.admin]
	},
	{
		name: 'clients',
		icon: 'fa fa-users',
		path: '/admin/clients',
		groups: [
			groups.admin,
			groups.moderator
		]
	},
	{
		name: 'news',
		icon: 'fa fa-newspaper-o',
		path: '/admin/news',
		groups: [
			groups.admin,
			groups.moderator,
			groups.content
		]
	}
];

const buildForUser = (user, phrases) => store.filter(link => {

	if (link.isAllGroups) return true;


	for (let group of link.groups) {
		if (user.groups.includes(group)) {
			return true;
		}
	}

	return false;

}).map(link => {
	let {name, icon, path} = link;

	return {
		name: phrases[name] || '',
		icon,
		path
	};

});

module.exports = {
	buildForUser
};
