const Controller = require('../../classes/ControllerEmployee');
const ErrorHttp  = require('../../classes/ErrorHttp');
const groups = require('../../constants/groups');
const Model   = require('../../models/mongo/employees');

class Employees extends Controller {
	static getMethodGroups () {
		return [groups.admin];
	}

	static async get_all_by_page (req, res) {
		let {page, pageSize} = req.decode;

		if (page === undefined || !pageSize) {
			throw ErrorHttp.badRequest();
		}

		let data = await Model.getByPage(page, pageSize);
		res.jwt(data);
	}
}

module.exports = Employees;
