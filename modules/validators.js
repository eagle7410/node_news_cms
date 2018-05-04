/**
 * Check is email
 * @param {string} email
 *
 * @returns {boolean}
 */
const isEmail = (email) => /\S+@\S+\.\S+/.test(email);

/**
 * Check string length not more max.
 *
 * @param {string} str
 * @param {number} max
 *
 * @returns {boolean}
 */
const isNotMoreLen = (str, max = 250) => str.length <= max;

/**
 * Check string be name or surname.
 * @param {string} str
 * @returns {boolean}
 */
const isNameSurname = (str) => /[A-Яa-я\-\s]{2,}/.test(str);

/**
 * Check is valid simple password.
 * @param {string} str
 * @returns {boolean}
 */
const isValidPassword = str => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/.test(str);

/**
 * Check confirm repeat password.
 * @param {string} pass
 * @param {string} confirm
 * @returns {boolean}
 */
const isValidConfirm = (pass, confirm) => pass === confirm;

module.exports = {
	isEmail,
	isNotMoreLen,
	isNameSurname,
	isValidPassword,
	isValidConfirm
}
