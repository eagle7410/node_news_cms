const ErrorHttp = require('./ErrorHttp');

class Controller {
	static isController () {return true;}
	static groups () {return {};};

	static async run(action, req, res, next) {

		action = action.toLowerCase();

		try {
			const method = `${(req.method || 'get').toLowerCase()}_${action}`;

			if (typeof this[method] !== 'function') {

				process.logger.warn(`${action} in controller ${this.name} not function `);

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

	static async auth (req, res) {
		throw new Error('Use abstract class Controller');
	}
}

module.exports = Controller;
