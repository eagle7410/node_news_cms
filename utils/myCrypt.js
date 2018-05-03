/**
 * Encode or decode string by secret.
 * @param {string}  word
 * @param {string}  secret
 * @param {boolean} isEncode
 * @returns {string}
 */
const crypt = (word, secret, isEncode = true) => {
	if (secret.length < 8) {
		throw new Error('Secret must be more 8 symbols');
	}

	let  result = '';

	for (let inx = 0, keyInx = 0; inx < word.length; inx++) {
		if (isEncode) {
			result += String.fromCharCode(word.charCodeAt(inx) + secret.charCodeAt(keyInx));
		} else {
			result += String.fromCharCode(word.charCodeAt(inx) - secret.charCodeAt(keyInx));
		}

		keyInx++;

		if (keyInx === secret.length) keyInx = 0;
	}

	return result;
}

module.exports = crypt;
