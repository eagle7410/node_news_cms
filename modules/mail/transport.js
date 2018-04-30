const nodemailer = require('nodemailer');
const {port, user, pass, host} = require('../../configs/email');

const transporter = nodemailer.createTransport({
	host,
	port,
	secure: false, // true for 465, false for other ports
	// generated ethereal user
	// generated ethereal password
	auth: {user, pass}
});


module.exports = transporter;
