const Controller = require('../../classes/ControllerEmployee');
const ErrorHttp = require('../../classes/ErrorHttp');
const groups = require('../../constants/groups');
const Model = require('../../models/mongo/clients');

class Clients extends Controller {
	static getMethodGroups () {
		return [
			groups.admin,
			groups.moderator
		];
	}

	static async get_all_by_page(req, res) {
		let {page, pageSize, is_active, is_deleted} = req.decode;

		if (page === undefined || !pageSize) {
			throw ErrorHttp.badRequest();
		}

		let filters = {};

		if (~is_active) {
			filters.is_active = is_active;
		}

		if (~is_deleted) {
			filters.is_deleted = is_deleted;
		}

		let data = await Model.getByPage(page, pageSize, filters);

		res.jwt(data);
	}

	static async post_save (req, res) {
		await Model.save(req.decode, req.tokenData.email);
		res.jwt({success : true});
	}

	static async post_set_deleted(req, res) {
		let data = req.decode;
		let client = await Model.getById(data.id);

		if (!client) {
			throw ErrorHttp.notFound();
		}

		client.is_deleted = data.is_deleted;
		client.updated_at = new Date();
		client.updated_by = req.tokenData.email;

		await client.save();

		res.jwt({client: client.toObject()});
	}

	static async post_activate(req, res) {
		let data = req.decode;
		let client = await Model.getById(data.id);

		if (!client) {
			throw ErrorHttp.notFound();
		}

		if (client.is_active) {
			return res.jwt({client: client.toObject()});
		}

		let date = new Date();

		client.is_active = true;
		client.confirm_at = date;
		client.confirm_by = req.tokenData.email;
		client.updated_at = date;
		client.updated_by = req.tokenData.email;

		await client.save();

		res.jwt({client: client.toObject()});
	}

	static async get_one(req, res) {
		let client = await Model.getById(req.decode.id);

		if (!client) {
			throw ErrorHttp.notFound();
		}

		res.jwt({client: client.toObject()});
	}
}

module.exports = Clients;
