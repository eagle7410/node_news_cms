const render = (req, {email, password}) => `
<h1>${req.__('Congratulations!')}</h1>
<p>${req.__('You are registered with us')}</p> 
<p>${req.__('Your login')} : ${email} ${req.__('Password')}: ${password} </p> 
<a href='http://localhost:${process.appPort}/'>${req.__('Sincerely Cool service')}</a>
`;

module.exports.confirmRegistration = (req, data) => {
	return {
		html : render(req, data),
		subject : req.__('Confirmation of registration ok')
	}
};
