const Controller = require('./Controller');

class ControllerClient extends Controller {
	static render (req, res, view, data = {}) {

		res.render(`${this.name}/${view}`, {
			...data,
			theme : process.theme,
			appName : process.appName
		})
	}
}

module.exports = ControllerClient;
