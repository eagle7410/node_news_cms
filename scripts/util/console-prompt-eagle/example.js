const ConsolePrompt = require('./index');
const prompt = new ConsolePrompt();

void async function () {
	let name = await prompt.ask('Enter you name');

	console.log(`You enter name ${name}`);

	process.exit();
}();
