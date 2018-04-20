const Controller = require('../../classes/Controller');

class App extends Controller {
	// static groups = {get_users : ['admin']}

	static async get_init (req, res) {
		res.status(200)
			.json({
				phrases: req.__('app_init').phrases
			});
	}

	static async post_auth (req, res) {

	}
}

module.exports = App;
