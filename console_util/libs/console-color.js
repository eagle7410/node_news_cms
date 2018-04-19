
class ConsoleColorLog {
	static getColorString (color, text) {
		const colors = {
			black       : '0;30',
			dark_gray   : '1;30',
			blue        : '0;34',
			light_blue  : '1;34',
			green       : '0;32',
			light_green : '1;32',
			cyan        : '0;36',
			light_cyn   : '1;36',
			red         : '0;31',
			light_red   : '1;31',
			puple       : '0;35',
			light_pupe  : '1;35',
			brown       : '0;33',
			yellow      : '1;33',
			ligh_gray   : '0;37',
			white       : '1;37',
			gray        : '0;90'
		};

		return `[${colors[color]}m ${text}[39m`;
	}

	success (text, data) {
		this._log('green', text, data);
	}

	error (text, data) {
		this._log('red', text, data);
	}
	warn (text, data) {
		this._log('yellow', text, data);
	}
	info (text, data) {
		this._log('blue', text, data);
	}
	_log (color, text, data = '') {
		console.log(ConsoleColorLog.getColorString(color, text), data);
	}
}

module.exports = {
	ConsoleColorLog
};
