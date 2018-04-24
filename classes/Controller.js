const ErrorHttp = require('./ErrorHttp');

class Controller {
	static isController () {return true;}
	static groups () {return {};};


	static async run_action(method, req, res) {
		await this[method](req, res);
	}

	static async run(action, req, res, next) {

		action = action.toLowerCase();

		try {
			const method = `${(req.method || 'get').toLowerCase()}_${action}`;

			if (typeof this[method] !== 'function') {

				process.logger.warn(`Controller|run. Action ${action} in controller ${this.name} not function `);

				return next();
			}

			let groups = this.groups()[method];

			if (!groups) {

				await this.run_action(method, req, res);

				return true;
			}

			await this.access(req, res, groups);

			await this.run_action(method, req, res);

			return true;

		} catch (e) {

			if (e instanceof ErrorHttp) {
				res.status(e.code).jwt(e.message);

				if (e.error)
					process.logger.error(e.error);

				return false;
			}

			res.status(500).jwt('Internal Server Error');

			process.logger.error(e);

			return false;
		}

	}

	static async access (req, res, groups) {

		if (!req.tokenData) {
			throw ErrorHttp.forbidden();
		}

		for (let group of req.tokenData.groups) {
			if (groups.includes(group)) {
				return true;
			}
		}

		throw ErrorHttp.forbidden();

	}
}

module.exports = Controller;
