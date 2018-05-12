const drive = process.drive;
const Controller = require('../../classes/ControllerEmployee');

const ErrorHttp  = require('../../classes/ErrorHttp');
const Model   = require('../../models/'+drive+'/employees');
const {create} = require('../../utils/jwt');

class Profile extends Controller {
	static async run_action(method, req, res) {
		if (!req.tokenData || !Object.keys(req.tokenData).length) {
			throw ErrorHttp.notFound();
		}

		await this[method](req, res);
	}

	static async put_update(req, res) {
		let {name, surname} = req.decode;

		if (!name || !surname) {
			throw ErrorHttp.badRequest();
		}

		let updates = await Model.updateOne({name, surname}, {email : req.tokenData.email});

		if (updates.n < 1) {
			throw ErrorHttp.notFound();
		}

		res.jwt({token : create(process.jwtPrivate, Model.toJwt({...req.tokenData, name, surname})) });
	}
}

module.exports = Profile;
