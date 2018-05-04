const Controller = require('../../classes/ControllerClient');

// TODO: clear
const ErrorHttp  = require('../../classes/ErrorHttp');
const {isEmail, isNameSurname, isSimplePassword, isValidConfirm} = require('../../modules/validators');
const {create} = require('../../utils/jwt');
const mail = require('../../modules/mail');
const keyPrivate  = process.jwtPrivate;
//const groups = require('../../constants/groups');
//const Model   = require('../../models/mongo/$MODEl$');

class Company extends Controller {
	static async get_contacts(req, res) {
		this.render(req,res, 'contact')
	}

	static async get_about(req, res) {
		this.render(req,res, 'about')
	}

	static async get_registration (req, res) {
		this.render(req,res, 'registration')
	}

	static async post_registration (req, res) {
		let data = this.validateRegistration(req.body);

		await mail.sendByView(
			data.email,
			'confirmEmail', {
				lang : res.locals.getLocale(),
				linkQuery : `?data=${encodeURIComponent(create(keyPrivate, data))}`
			},
			req
		);

		res.redirect('/company/message_about_confirm');
	}

	static async get_message_about_confirm (req, res) {
		this.render(req,res, 'message_about_confirm')
	}

	static validateRegistration (data) {

		let {email, password, name, surname, confirm} = data;

		if (
			!isEmail(email) ||
			!isNameSurname(name) ||
			!isNameSurname(surname) ||
			!isSimplePassword(password) ||
			!isValidConfirm(password, confirm)
		) {
			throw ErrorHttp.badRequest();
		}

		return {
			email,
			name,
			surname,
			password
		};
	}

}

module.exports = Company;
