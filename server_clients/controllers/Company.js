const Controller = require('../../classes/ControllerClient');

// TODO: clear
//const ErrorHttp  = require('../../classes/ErrorHttp');
//const groups = require('../../constants/groups');
//const Model   = require('../../models/mongo/$MODEl$');

class Company extends Controller {
	static async get_contacts(req, res) {
		this.render(req,res, 'contact')
	}

	static async get_about(req, res) {
		this.render(req,res, 'about')
	}
}

module.exports = Company;
