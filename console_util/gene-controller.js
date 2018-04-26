const {ConsoleColorLog} = require('./libs/console-color');
const fs          = require('fs');
const log         = new ConsoleColorLog();
const {promisify} = require('util');
const writter     = promisify(fs.writeFile);
const reader      = promisify(fs.readFile);
const {drive} = require('../configs/database');

// Get params
let name;
let isEmployee = false;
let to1Up = ((val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase());
process.argv.map(arg => {

	if (arg.includes('-n=')) {
		name = arg.trim().replace('-n=', '');
	}

	if (arg.includes('-a')) {
		isEmployee = true;
	}
});

if (!name) {
	log.error('Need set name. Example use: node ./console_util/gene-controller.js -n=app -a');
	process.exit();
}

name = name.replace(/_/g, '-');

let className = name.split('-').map(to1Up).join('');
let extendClass = isEmployee ? 'ControllerEmployee': 'ControllerClient' ;

let template = `const Controller = require('../../classes/${extendClass}');\n
// TODO: clear
//const ErrorHttp  = require('../../classes/ErrorHttp');
//const groups = require('../../constants/groups');
//const MODEl   = require('../../models/${drive}/MODEl');

class ${className} extends Controller {
	// TODO: clear
	// static groups () {
	// 	return {get_users : [groups.admin]}
	// };
	// static async get_users (req, res) {}
}

module.exports = ${className};
`;

let basePath = `${__dirname}/../${isEmployee ? 'server_employee': 'server_clients'}/controllers`;
let indexPath = `${basePath}/index.js`;

const createFileAndAddToIndex = async () => {
	await writter(`${basePath}/${className}.js`, template);
	let index =  await reader(indexPath);

	await writter(
		indexPath,
		`const ${className} = require('./${className}');\n` +
		index.toString().replace('};', `\t${className},\n};`)
	);
};

createFileAndAddToIndex().then(
	() => {
		log.success('Success generate controller.');
		process.exit();
	},
	e => {
		log.error('Error generate controller', e);
		process.exit();
	}
);
