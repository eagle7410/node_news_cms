const Controller = require('./Controller');
const {buildForUser} = require('../server_clients/modules/menu-top');

class ControllerClient extends Controller {
	static render (req, res, view, data = {}) {
		// TODO: clear
		console.log('req.cokies', req.cokies);
		res.render(`${this.name}/${view}`, {
			...data,
			theme : process.theme,
			langs : res.locals.getLocales(),
			lang  : res.locals.getLocale(),
			appName : process.appName,
			topMenu : buildForUser(req)
		})
	}
}

module.exports = ControllerClient;
