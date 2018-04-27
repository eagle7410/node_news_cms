const {drive}    = require('../configs/database.json');

module.exports = (config) => {
	const {
		jwtPublic,
		jwtPrivate,
		isDev,
		port,
		name,
		theme
	} =  require(`../configs/${config}.json`);

	Object.assign(process, {
		appName : name,
		appPort : port || 3537,
		logger  : require('./logger.js')(name),
		jwtPrivate,
		jwtPublic,
		isDev,
		drive,
		theme
	});
};
