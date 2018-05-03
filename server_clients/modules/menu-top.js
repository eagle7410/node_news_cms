const groups = require('../../constants/groups');

const store = [
	{
		url : '/',
		name : 'news'
	},
	{
		name : 'company',
		subs : [
			{
				url : '/company/about',
				name : 'about'
			},
			{
				url : '/company/contacts',
				name : 'contacts'
			}
		]
	},
	{
		name : 'registration',
		url  : '/company/registration'
	},
	{
		name  : 'login',
		url   : '#',
		class : 'linkLogin'
	},
];

const buildForUser = (req) => store.map(item => {
	if (item.subs) {

		item.isActive = req.path.includes(`/${item.name}/`);

		item.subs = item.subs.map(sub => {
			sub.isActive = sub.url === req.path

			return sub;
		})

	} else {
		item.isActive = item.url === req.path
	}

	return item;
});

module.exports = {
	buildForUser
};
