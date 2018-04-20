const Controller = require('../../classes/ControllerEmployee');
const ErrorHttp  = require('../../classes/ErrorHttp');

class App extends Controller {
	// static groups () {
	// 	return {post_auth : ['admin']}
	// };

	static async get_init (req, res) {
		res.status(200)
			.json({phrases: req.__('app_init').phrases});
	}

	static async post_auth (req, res) {
		let {email, password} = req.body;

		if (!email || !password) {
			throw new ErrorHttp('Bad request');
		}

		// TODO: clear
		console.log('email ', email, password);
	}
}

module.exports = App;
