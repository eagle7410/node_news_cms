const drive = process.drive;
const Controller = require('../../classes/ControllerEmployee');

const ErrorHttp  = require('../../classes/ErrorHttp');
const groups = require('../../constants/groups');
const Model   = require('../../models/'+drive+'/employees');

class Employees extends Controller {
	static getMethodGroups () {
		return [
			groups.admin
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

		let data = await Model.getByPage(req.decode.page, req.decode.pageSize, filters);

		res.jwt(data);
	}

	static async post_save (req, res) {
		await Model.save(req.decode, req.tokenData.email);
		res.jwt({success : true});
	}

	static async post_set_deleted(req, res) {
		let data = req.decode;
		let row = await Model.getById(data.id);

		if (!row) {
			throw ErrorHttp.notFound();
		}

		row.is_deleted = data.is_deleted;

		await Model.save(row, req.tokenData.email);

		res.jwt({row : row.toObject()});
	}

	static async post_activate(req, res) {
		let data = req.decode;
		let employee = await Model.getById(data.id);

		if (!employee) {
			throw ErrorHttp.notFound();
		}

		let date = new Date();

		employee.is_active = !employee.is_active;

		await Model.save(employee, req.tokenData.email);

		res.jwt({row: employee.toObject()});
	}

	static async get_one(req, res) {
		let employee = await Model.getById(req.decode.id);

		if (!employee) {
			throw ErrorHttp.notFound();
		}

		res.jwt({row: employee.toObject()});
	}
}

module.exports = Employees;
