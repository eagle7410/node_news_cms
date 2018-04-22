const Controller = require('../../classes/ControllerEmployee');
const ErrorHttp  = require('../../classes/ErrorHttp');
const Employee   = require('../../models/mongo/employees');
const {create} = require('../../utils/jwt');
const {buildForUser} = require('../modules/left-menu');

class App extends Controller {

	static async get_init (req, res) {
		res.jwt({phrases: req.__('app_init').phrases});
	}

	static async post_auth (req, res) {
		let {email, password, is_update} = req.decode;

		if (!email || !password) {
			throw new ErrorHttp('Bad request');
		}

		let user = await Employee.getByEmailAndCheck(email, password);

		if (user === false) {
			throw ErrorHttp.unauthorized();
		}

		if (is_update) {
			return  res.jwt({
				token    : create(process.jwtPrivate, Employee.toJwt(user)),
			});
		}

		res.jwt({
			token    : create(process.jwtPrivate, Employee.toJwt(user)),
			user     : Employee.toProfile(user),
			leftMenu : buildForUser(user, req.__('left_menu')),
			phrases  : req.__('dash')
		});

	}
}

module.exports = App;