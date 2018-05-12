const drive = process.drive;
const Controller = require('../../classes/ControllerEmployee');

const ErrorHttp  = require('../../classes/ErrorHttp');
const Model   = require('../../models/'+drive+'/notifications');
const {isEmail} = require('../../modules/validators');

class Notifications extends Controller {
	static async run_action(method, req, res) {
		if (!req.tokenData || !Object.keys(req.tokenData).length) {
			throw ErrorHttp.notFound();
		}

		await this[method](req, res);
	}

	static async get_all_by_page(req, res) {
		const subscribe = req.tokenData.email;
		let {page, pageSize, read_at} = req.decode;

		if (page === undefined || !pageSize) {
			throw ErrorHttp.badRequest();
		}

		let query = {subscribe};

		switch (read_at) {
			case 0 :
				query.read_at = {$exists : false};
				break;

			case 1 :
				query.read_at = {$exists : true};
				break;
		}

		let data = await Model.getByPage(page, pageSize, query);

		const countUnread = await Model.countUnread(subscribe);

		res.jwt({
			...data,
			countUnread
		});
	}

	static async post_save(req, res) {

		let notify = this.validate(req);

		await Model.create(notify);

		res.jwt({success : true});
	}

	static async post_read(req, res) {
		const id        = req.decode.id;
		const subscribe = req.tokenData.email;
		let notify = await Model.getById(id);

		if (!notify) {
			throw ErrorHttp.badRequest();
		}

		notify.read_at = new Date();

		await notify.save();

		const countUnread = await Model.countUnread(subscribe);

		res.jwt({
			success : true,
			row : notify,
			countUnread
		});
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
