// Libs
require(`../../models/mongo/connect` );

// Models
const employees = require(`../../models/mongo/employees` );

const migrate = async () => {
	try {
		await employees.create({
			name     : 'Igor',
			surname  : 'Stcherbina',
			groups   : ['admin'],
			password : 'qwertY23456',
			email    : 'verycooleagle@gmail.com'
		});

		return true;
		
	} catch(e) {
		console.error('test-admin|Migrate|Error', e);
	}
};


if (process.env.tasks) {
	module.exports = migrate;
} else {
	let exit = () => process.exit(1);
	migrate().then(exit, exit);
}
