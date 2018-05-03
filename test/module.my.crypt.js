const assert = require('assert');
const SECRET = 'Q1W2FDDG34EDESVFASTR5';
const word = 'Hi world. I am give you big secret.';
const myCrypt = require('../utils/myCrypt');

describe('Test module my crypt', () => {
	it('Check encode and decode', async () => {
		let code = myCrypt(word, SECRET);

		console.log('Show code ', code);
		assert.equal(code !== word, true);

		assert.equal(myCrypt(code, SECRET, false) === word, true);
	});
});
