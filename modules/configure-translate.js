const i18n = require("i18n");

module.exports = (app, directory) => {
	i18n.configure({
		locales:['en', 'ru'],
		defaultLocale: 'ru',
		directory,
	});
	app.use(i18n.init);
};
