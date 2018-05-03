const Controller = require('../../classes/ControllerClient');
const {create} = require('../../utils/jwt');

// TODO: clear
const ErrorHttp  = require('../../classes/ErrorHttp');
//const groups = require('../../constants/groups');
const Model   = require('../../models/mongo/clients');

class Auth extends Controller {
	// TODO: clear
	// static groups () {
	// 	return {
	//		get_users : [
	//			groups.admin
	//		]
	//	}
	// };
	// static getMethodGroups () {
	// 	return [
	// 		groups.admin,
	// 	];
	// }
	static async post_login(req, res) {
		let {email, password, is_update} = req.decode;

		if (!email || !password) {
			throw new ErrorHttp('Bad request');
		}

		let user = await Model.getByEmailAndCheck(email, password);

		if (user === false) {
			throw ErrorHttp.unauthorized();
		}

		return  res.base({token: create(process.jwtPrivate, Model.toJwt(user)) });
	}
}

module.exports = Auth;
