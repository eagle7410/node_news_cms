const Controller = require('../../classes/ControllerClient');

// TODO: clear
//const ErrorHttp  = require('../../classes/ErrorHttp');
//const groups = require('../../constants/groups');
//const Model   = require('../../models/mongo/$MODEl$');

class Home extends Controller {
	// TODO: clear
	// static groups () {
	// 	return {
	//		get_users : [
	//			groups.admin
	//		]
	//	}
	// };

	static async get_show(req, res) {
		this.render(req, res, 'show');
	}
}

module.exports = Home;
