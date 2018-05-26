const ConsoleColorLog = require('console-color');


class ConsolePrompt {
	constructor () {
		this._log = new ConsoleColorLog();
	}

	/**
	 * Show in console question.
	 * @param {string} question
	 *
	 * @returns {Promise<string>} Return answer
	 */
	ask (question) {
		const stdin = process.openStdin();
		this._log.q(`${question} ? :`);

		return new Promise((ok,bad)=> {
			stdin.addListener('data', answer => {

				answer = answer.toString();

				if (answer.length && answer.charAt(answer.length-1) === '\n') {
					answer = answer.slice(0,-1)
				}

				ok(answer);
			});

			stdin.addListener('error', bad);
		});
	}
}

module.exports = ConsolePrompt;
