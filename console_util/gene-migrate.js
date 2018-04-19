const fs     = require('fs');
const moment = require('moment');
const {ConsoleColorLog} = require('./libs/console-color');
const {promisify} = require('util');
const {drive} = require('../configs/database');
const log = new ConsoleColorLog();
const writter = promisify(fs.writeFile);

// Get params
let name;

process.argv.map(arg => {
	if (arg.includes('-n=')) {
		name = arg.trim().replace('-n=', '');
	}
});

if (!name) {
	log.error('Need set name. Example use: node ./utils-console/gene-migrate.js -n=test');
	process.exit();
}

let template;

switch (drive) {
	case 'mongo':
		template = `// Libs
require(\`../../models/mongo/connect\` );

// Models

const migrate = async () => {
	try {
		// Do something...

		return true;
		
	} catch(e) {
		console.error('${name}|Migrate|Error', e);
	}
};


if (process.env.tasks) {
	module.exports = migrate;
} else {
	let exit = () => process.exit(1);
	migrate().then(exit, exit);
}`;

		break;
}

let mark = moment().format("YYYYMMDDHHmmss");

writter(`${__dirname}/../migration/${drive}/${mark}_${name.charAt(0).toUpperCase() + name.slice(1)}.js`, template).then(
	() => {
		log.success('Success generate migrate.');
		process.exit();
	},
	e => {
		log.error('Error generate migrate', e);
		process.exit();
	}
);
