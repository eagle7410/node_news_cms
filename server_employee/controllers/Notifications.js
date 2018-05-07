const Controller = require('../../classes/ControllerEmployee');

const ErrorHttp  = require('../../classes/ErrorHttp');
const Model   = require('../../models/mongo/notifications');
const {isEmail} = require('../../modules/validators');
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

	static async post_save(req, res) {

		let notify = this.validate(req);

		await Model.create(notify);

		res.jwt({success : true});
	}

	static async post_read(req, res) {
		const id = req.decode.id;
		let notify = await Model.getById(id);

		if (!notify) {
			throw ErrorHttp.badRequest();
		}

		notify.read_at = new Date();

		await notify.save();

		res.jwt({success : true, row : notify});
	}

	static validate(req) {
		let {title, subscribe, data, type} = req.decode;

		if (!isEmail(subscribe) || !title || !data || !type) {
			throw ErrorHttp.badRequest();
		}

		return {
			created_by : req.tokenData.email,
			title,
			subscribe,
			data,
			type
		};
	}
}

module.exports = Notifications;
