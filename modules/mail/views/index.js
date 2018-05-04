const confirmEmail = require('./confirm-email');
const confirmRegistration = require('./confirm-registration');

module.exports = {
	...confirmEmail,
	...confirmRegistration
};
