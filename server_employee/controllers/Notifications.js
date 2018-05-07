const Controller = require('../../classes/ControllerEmployee');

const ErrorHttp  = require('../../classes/ErrorHttp');
const Model   = require('../../models/mongo/notifications');

class Notifications extends Controller {
	static async run_action(method, req, res) {
		if (!req.tokenData || !Object.keys(req.tokenData).length) {
			throw ErrorHttp.notFound();
		}

		await this[method](req, res);
	}

	static async get_all_by_page(req, res) {
		let {page, pageSize} = req.decode;

		if (page === undefined || !pageSize) {
			throw ErrorHttp.badRequest();
		}

		let data = await Model.getByPage(req.decode.page, req.decode.pageSize);
		res.jwt(data);
	}
}

module.exports = Notifications;
