const fs             = require('fs');
const {promisify}    = require('util');
const ConsoleLog     = require('console-color');
const ConsolePrompt  = require('console-prompt-eagle');
const {drive}        = require(`${__dirname}/configs/database.json`);

const log     = new ConsoleLog();
const prompt  = new ConsolePrompt();
const write   = promisify(fs.writeFile);

require(`../models/${drive}/connect` );
const Employee = require(`../models/${drive}/employees` );

void async function setFirstUser() {
	const nameDef     = 'Igor';
	const surnameDef  = 'Stcherbina';
	const groups      = ['admin'];
	const emailDef    = 'verycooleagle@gamil.com';
	const passwordDef = 'test2Testing' + Date.now();

	try {
		let name = await prompt.ask(`Enter user name [${nameDef}]`);
		name = name || nameDef;

		let surname = await prompt.ask(`Enter user surname [${surnameDef}]`);
		surname = surname || surnameDef;

		let email = await prompt.ask(`Enter user email [${emailDef}]`);
		email = email || emailDef;

		let password = await prompt.ask(`Enter user password [${passwordDef}]`);
		password = password || passwordDef;

		const user = {name, surname, email, password, groups};

		await Employee.create(user);

		log.info(`[Ok] Add user to database`);

		await write(`${__dirname}/logs/first.user.json`, JSON.stringify(user, null, '\t'));

		log.info(`[Ok] Write user info to /logs/first.user.json`);
		log.success('Add admin employee user');

	} catch (e) {
		log.error('Err is ', e);
	}
}();
