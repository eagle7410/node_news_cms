const http = require('http');
const jwt = require('../utils/jwt');
const myCrypt = require('../utils/myCrypt');
const keyPublic  = process.jwtPublic;

http.ServerResponse.prototype.jwt = function (json = {}, code) {
	if (code) this.status(code);
	this.json({hash : jwt.create(keyPublic, json)});
};

http.ServerResponse.prototype.base = function (json = {}, code) {
	if (code) this.status(code);
	// TODO: clear expire
	console.log('base', {base : myCrypt(JSON.stringify(json), keyPublic.key) });
	this.json({base : myCrypt(JSON.stringify(json), keyPublic.key) });
};

const run = function() {
	let port = process.appPort;
	const baseLine = `=== ${process.appName} APP READY IN PORT ${port} ===\n`;
	const len = baseLine.length -1;

	process.logger.info(`Up server in posrt ${port}`);

	this.listen(port, () =>
		console.log(
			`\n\n ${'='.repeat(len)}\n ${baseLine} ${'='.repeat(len)}\n`,
			`link in browser http://localhost:${port}\n\n`,
		)
	);
};

module.exports = (app) => {
	let server = http.Server(app);

	server.run = run;

	return server;
};
