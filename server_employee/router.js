const express = require('express');
const router = express.Router();
const {to1Up} = require('../utils/string');
const controllers = require('./controllers');
const Controller = require('../classes/Controller');

router.all('/:controller/:action', (req, res, next) => {
	let controllerName = req.params.controller.toLowerCase().split('-').map(to1Up).join('');
	let controller = controllers[controllerName];

	if (!controller)
		return next();

	if (!controller.isController) {
		process.logger.warn(`Controller ${controllerName} is not class controller`);
		return next();
	}

	controller.run(req.params.action, req, res, next);
});

module.exports = router;
