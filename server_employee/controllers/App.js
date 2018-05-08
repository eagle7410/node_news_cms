const Controller     = require('../../classes/ControllerEmployee');
const ErrorHttp      = require('../../classes/ErrorHttp');
const Employee       = require('../../models/mongo/employees');
const Notifications  = require('../../models/mongo/notifications');
const {create}       = require('../../utils/jwt');
const {buildForUser} = require('../modules/left-menu');
const groups = require('../../constants/groups');
const i18n   = require("i18n");

class App extends Controller {

	static async run_action(method, req, res) {
		if (req.decode && req.decode.lang) {
			i18n.setLocale(req, req.decode.lang);
		}

		await this[method](req, res);
	}

	static async get_init (req, res) {
		res.jwt({
			phrases: res.__('app_init').phrases,
			langs : res.locals.getLocales(),
			lang  : res.locals.getLocale()
		});
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

		const countUnread = await Notifications.countUnread(email);

		res.jwt({
			token     : create(process.jwtPrivate, Employee.toJwt(user)),
			user      : Employee.toProfile(user),
			leftMenu  : buildForUser(user, req.__('left_menu')),
			phrases   : req.__('dash'),
			groupList : groups,
			countUnread
		});

	}
}

module.exports = App;
