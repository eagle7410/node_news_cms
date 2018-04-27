const controllers = require('./controllers');
const Router = require('../classes/Router');

module.exports = (...agrs) => Router.init(controllers, ...agrs);
