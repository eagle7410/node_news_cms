process.drive = 'mysql';
// Connect to database
require(`./models/${process.drive}/connect`);

const Employees = require('./models/mysql/employees');


const run = async () => {

	// let emp = await Employees.create({
	// 	name     : 'Igor',
	// 	surname  : 'Stcherbina',
	// 	groups   : ['admin'],
	// 	password : 'test2Testing',
	// 	email    : 'test1@Mail.com'
	// })

	// await Employees.updateAll({name : 'Igor'});

	let emp = await Employees.getByPage();

	for (let doc of  emp.docs) {
		console.log('Doc is ', doc.toObject());
	}
	// let emp = await Employees.getByEmailAndCheck('test@mail.com', 'test2Testing');

	// console.log('to Object', emp.length);

// 	let emps = await Employees.getOne();

	// for(let emp of emps) {
	// 	console.log('emp -> ', emp._id);
	// }
	// console.log('Success..', emps);

};

run().catch(err => {
	// TODO: clear
	console.dir(err.name && err.message);
	console.error('Err ', err);
})
