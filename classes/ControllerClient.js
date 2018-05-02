const Controller = require('./Controller');
const {buildForUser} = require('../server_clients/modules/menu-top');

class ControllerClient extends Controller {
	static render (req, res, view, data = {}) {
		res.render(`${this.name}/${view}`, {
			...data,
			theme : process.theme,
			langs : res.locals.getLocales(),
			lang  : res.locals.getLocale(),
			appName : process.appName,
			topMenu : buildForUser(req),
			path : req.path
		})
	}
}

module.exports = ControllerClient;
