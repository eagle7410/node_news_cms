const render = (req, data) => `${req.__('Link for registration confirmation')} <a href='http://localhost:${process.appPort}/auth/confirm-registration${data.linkQuery}'>${req.__('Click me')}</a>`;

module.exports.confirmEmail = (req, data) => {
	return {
		html : render(req, data),
		subject : req.__('Confirm registration')
	}
};
