// Libs
const ConsoleColor = require('console-color');
const ImageCreate  = require('./ImageCreate');
const Spinner      = require('cli-spinner').Spinner;

// Initial
const log     = new ConsoleColor();
const spinner = new Spinner();
spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');

let command;

process.argv.map(arg => {
	if (arg.includes('-c=')) {
		command = arg.trim().replace('-c=', '');
	}
});

void async function letsGo() {

	try {
		switch (command) {
			case 'image:create':

				await (new ImageCreate({spinner})).run();
				break;

			default :
				log.error(`You not specified command or this command not implement.`);
		}
	} catch (e) {
		spinner.stop();
		log.error(`Process has error.`, e);
	}

	process.exit();
}();

// 	text: '%s processing ',
// })
// obj
// Get params
