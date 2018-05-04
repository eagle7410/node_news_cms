const jwt = require('../utils/jwt');
const myCrypt = require('../utils/myCrypt');
const keyPublic  = process.jwtPublic;
const keyPrivate = process.jwtPrivate;

module.exports = async (req, res, next) => {
	try {
		const hash = req.query.hash || req.body.hash;
		const base = req.query.base || req.body.base;

		if (req.cookies.token) {
			req.tokenData = await jwt.decode(keyPrivate, req.cookies.token);
		}

		if (!hash && !base) {
			return next();
		}


		if (hash) {
			req.decode = await jwt.decode(keyPublic, hash);
		} else {
			req.decode = JSON.parse(myCrypt(base, keyPublic.key, false));

			const date = new Date();

			if (Number(req.decode.expire) > (date.getTime() + date.getTimezoneOffset()*6e4)) {
				return next();
			}

		}

		if (process.isDev) {
			console.log('~~ data decode \n', req.decode);
		}

		if (!req.decode || !req.decode.token) {
			return next();
		}

		req.tokenData = await jwt.decode(keyPrivate, req.decode.token);

		next();

	} catch (err) {
		let message = 'Token expired';
		const success = false;

		if (err.name === 'TokenExpiredError') {
			return res.status(404).jwt({
				message,
				success,
				name : err.name
			});
		}

		if (err.stack) {
			message = err.stack;
		} else if (err.message) {
			message = err.message;
		} else {
			message = err;
		}

		process.logger.warn(`${req.ip} ${req.path}: ${message}`);

		res.status(401).json({ message, success});
	};
};
