const ErrorHttp = require('./ErrorHttp');

class Controller {
	static groups = {};

	static async run(action, req, res, next) {
		try {
			const method = `${(req.method || 'get').toLowerCase()}_${action}`;

			if (this[method] instanceof Promise === false) {

				process.logger.warn(`${action} in controller not promise ${this.name}`);

				return next();
			}

			let groups = this.groups()[method];

			if (!groups) {

				await this[method](req, res);

				return true;
			}

			await this.auth(req, res);

			// TODO: Back check groups

		} catch (e) {

			if (e instanceof ErrorHttp) {

				res.status(e.code).json(e.message);

				if (e.error)
					process.logger.error(e.error);

				return false;
			}

			res.status(500).json('Internal Server Error');

			process.logger.error(e);

			return false;
		}

	}

	static async auth (req, res) {
		// TODO: Back
	}
}

module.exports = Controller;
