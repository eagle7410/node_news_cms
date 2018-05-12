const Controller = require('../../classes/ControllerClient');
const {create, decode} = require('../../utils/jwt');
const drive = process.drive;

const ErrorHttp  = require('../../classes/ErrorHttp');
const Model   = require('../../models/'+drive+'/clients');
const mail = require('../../modules/mail');

class Auth extends Controller {
	static async post_login(req, res) {
		let {email, password} = req.decode;

		if (!email || !password) {
			throw ErrorHttp.badRequest();
		}

		let user = await Model.getByEmailAndCheck(email, password);

		if (user === false) {
			throw ErrorHttp.unauthorized();
		}

		return  res.base({token: create(process.jwtPrivate, Model.toJwt(user)) });
	}

	static async get_confirm_registration(req, res) {
		let data = req.query.data;

		if (!data) {
			throw ErrorHttp.notFound()
		}

		const {email, password, surname, name } = await decode(process.jwtPrivate, data);

		const count = await Model.countByEmail(email);

		if (count > 0) {
			return res.redirect('/company/confirm-registration?type=warn');
		}

		await Model.create({
			email,
			password,
			surname,
			name,
			created_by : email,
			updated_by : email,
			is_active  : true
		});

		await mail.sendByView(
			email,
			'confirmRegistration', {
				email,
				name,
				surname,
				password
			},
			req
		);

		res.redirect('/company/confirm-registration?type=ok');
	}
}

module.exports = Auth;
