const transport   = require('./transport');
const from = '"Cool service 👻" <CoolSevicce@example.com>';

const send = data => new Promise((ok,bad)=> {
	transport.sendMail(data, (error, info) => error ? bad(error) : ok(info));
});

const buildTos = to => Array.isArray(to) ? to.join(',') : to;

/**
 * Send html mail.
 * @param {array|string} to
 * @param {string} subject
 * @param {string} html
 * @returns {*}
 */
const sendHtml = (to, subject, html) => send({
	to : buildTos(to),
	subject,
	from,
	html
});

/**
 * Send html mail with render by view.
 * @param {array|string} to
 * @param {string} view
 * @param {object} data
 * @returns {Promise<void>}
 */
const sendByView = async (to, view, data) => {

}

module.exports = {
	sendByView,
	sendHtml
};
