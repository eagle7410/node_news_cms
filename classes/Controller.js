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
			const method = `${(req.method || 'get').toLowerCase()}_${action.replace(/\-/g, '_')}`;

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

				this.sendErrorMessage(req, res, e.code, e.message);

				if (e.error)
					process.logger.error(e.error);

				return false;
			}

			this.sendErrorMessage(req, res);

			process.logger.error(e);

			return false;
		}

	}

	static sendErrorMessage (req, res, code = 500, message = 'Internal Server Error' ) {
		res.status(code);

		if (req.tokenData && req.tokenData.email) {
			res.jwt('Internal Server Error');
		} else {
			res.json({message});
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
