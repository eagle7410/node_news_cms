const fs = require('fs');
const {promisify} = require('util');
const {ConsoleColorLog} = require('./libs/console-color');

const log = new ConsoleColorLog();
const dirList = promisify(fs.readdir);
const {drive} = require('../configs/database');

if (drive === 'mongo') {
	log.warn('This not need for mongo.');
	process.exit();
}

const PATH_MODEL = `${__dirname}/../models/${drive}`;

const run = async () => {
	let list = await dirList(PATH_MODEL);

	for (let fileName of list) {
		if (!/(.*)\.js/.test(fileName)) {
			log.warn(`Models folder have not js file ${fileName}`);
			continue;
		}

		if (fileName === 'connect.js') {
			continue;
		}

		log.info(`~Run refresh ${fileName}`);

		const data = require(PATH_MODEL + '/' + fileName);
		await data.Model.sync({force: true});

		log.info(`~~${fileName} - refresh OK;`);
	}
};

require(PATH_MODEL + '/connect');

run().then(
	() => {
		log.success('Success refresh db struct.');
		process.exit();
	},
	e => {
		log.error('Error refresh db struct', e);
		process.exit();
	}
);

