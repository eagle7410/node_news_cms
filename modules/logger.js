
const CircularJSON = require('circular-json');
const
	APP_NAME = 'EXT',
	LOG_FOLDER = `${__dirname}/../logs`,
	Winston = require('winston'),
	fs = require('fs');


if (!fs.existsSync(LOG_FOLDER))
	fs.mkdirSync(LOG_FOLDER);

module.exports = (name = APP_NAME) => {
	const appPath = `${LOG_FOLDER}/${name}`;

	if (!fs.existsSync(appPath))
		fs.mkdirSync(appPath);

	const winston = new (Winston.Logger)({
		transports: [
			new (Winston.transports.Console)({
				handleExceptions: false,
				colorize: true,
				timestamp: true,
				level: 'debug',
				label: name
			}),
			new (Winston.transports.File)({
				handleExceptions: false,
				level: 'info',
				name: 'info-logs',
				createDirectory: true,
				timestamp: true,
				filename: `${appPath}/info.log`,
				json: false
			}),
			new (Winston.transports.File)({
				level: 'error',
				name: 'error-logs',
				createDirectory: true,
				timestamp: true,
				filename: `${appPath}/errors.log`,
				json: false
			})
		]
	});

	let serialization = (data) => data.map(d => {
		if (typeof d === 'object') {

			if (d.stack) {
				return d.stack;
			}

			if (d.message) {
				return d.message;
			}

			return CircularJSON.stringify(d, null, '\t');
		}

		return d;
	});
	return {
		error : (...data) => winston.error(...serialization(data)),
		info  : (...data) => winston.info(...serialization(data)),
		warn  : (...data) => winston.error(...serialization(data)),
	}

};
