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
		let {page, pageSize} = req.decode;

		if (page === undefined || !pageSize) {
			throw ErrorHttp.badRequest();
		}

		let data = await Model.getByPage(page, pageSize);
		res.jwt(data);
	}

	static async post_save (req, res) {
		await Model.save(req.decode, req.tokenData.email);
		res.jwt({success : true});
	}
}

module.exports = Clients;
