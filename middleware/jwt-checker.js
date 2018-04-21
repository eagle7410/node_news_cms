const jwt = require('../utils/jwt');
const keyPublic  = process.jwtPublic;
const keyPrivate = process.jwtPrivate;

module.exports = async (req, res, next) => {
	try {
		const hash = req.query.hash || req.body.hash;

		if (!hash) {
			return next();
		}

		req.decode = await jwt.decode(keyPublic, hash);

		if (!req.decode.token) {
			return next();
		}

		// if (!req.token)
		// 	throw 'No token';
		//
		// const decoded = verify(req.token);
		// req.token_data = decoded.data || null;
		//
		// next();
	} catch (err) {
		let message = 'Token expired';
		const success = false;

		if (err.name === 'TokenExpiredError') {
			return res.status(401).json({ message, success});
		}

		if (err.stack) {
			message = err.stack;
		} else if (err.message) {
			message = err.message;
		} else {
			message = err;
		}

		proces.logger.warn(`${req.ip} ${req.path}: ${message}`);

		res.status(401).json({ message, success});
	};
};
