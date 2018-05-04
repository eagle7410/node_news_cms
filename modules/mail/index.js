const transport   = require('./transport');
const views = require('./views');
const from  = '"Cool service 👻" <CoolSevicce@example.com>';

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
 * @param {object} req
 * @returns {Promise<void>}
 */
const sendByView = async (to, view, data, req) => {
	let render = views[view];

	if (!render) {
		throw new Error(`No implemant view ${view}`);
	}

	const template = render(req, data);

	sendHtml(to, template.subject, template.html);

	return true;
};

module.exports = {
	sendByView,
	sendHtml
};
