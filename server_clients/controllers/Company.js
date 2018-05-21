const Controller = require('../../classes/ControllerClient');

const ErrorHttp  = require('../../classes/ErrorHttp');
const {isEmail, isNameSurname, isValidPassword, isValidConfirm} = require('../../modules/validators');
const {create} = require('../../utils/jwt');
const mail = require('../../modules/mail');
const keyPrivate  = process.jwtPrivate;

class Company extends Controller {
	static async get_contacts(req, res) {
		await this.render(req,res, 'contact')
	}

	static async get_about(req, res) {
		await this.render(req,res, 'about')
	}

	static async get_confirm_registration(req, res) {
		let type = req.query.type;

		if (!type) {
			throw ErrorHttp.badRequest();
		}

		await this.render(req,res, 'registration-confirm', {type});
	}

	static async get_registration (req, res) {
		await this.render(req,res, 'registration')
	}

	static async post_registration (req, res) {
		let data = this.validateRegistration(req.body);

		await mail.sendByView(
			data.email,
			'confirmEmail',
			{ linkQuery : `?data=${encodeURIComponent(create(keyPrivate, data))}` },
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
			!isValidPassword(password) ||
			!isValidConfirm(password, confirm)
		)
			throw ErrorHttp.badRequest();

		return {email, name, surname, password};
	}

}

module.exports = Company;
