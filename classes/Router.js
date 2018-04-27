const express = require('express');
const router = express.Router();
const {to1Up} = require('../utils/string');
let controllers;

class Router {
	static setControllers(cnts) {
		controllers = cnts;
	}
	static init (controllers, controller = null, action = null)  {

		this.setControllers(controllers);

		if (controller && action) {
			router.all('/', (req, res, next) => {
				req.params = {controller, action};
				this.handleRequest(req, res, next);
			});
		}

		router.all('/:controller/:action', this.handleRequest);

		return router;
	}

	static handleRequest(req, res, next) {

		let controllerName = req.params.controller.toLowerCase().split('-').map(to1Up).join('');
		let controller = controllers[controllerName];

		if (!controller)
			return next();

		if (!controller.isController) {
			process.logger.warn(`Controller ${controllerName} is not class controller`);
			return next();
		}

		controller.run(req.params.action, req, res, next);
	}
}

module.exports = Router;
