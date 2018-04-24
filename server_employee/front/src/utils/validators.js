/**
 * Check is email
 * @param {string} email
 *
 * @returns {boolean}
 */
const isEmail = (email) => /\S+@\S+\.\S+/.test(email);
/**
 * Check date is today or future.
 *
 * @param {Date} date
 *
 * @returns {*}
 */
const isNowOrFuture = (date) => date.isFutureOrNowDay();
/**
 * Check string length not more max.
 *
 * @param {string} str
 * @param {number} max
 *
 * @returns {boolean}
 */
const isNotMoreLen = (str, max = 250) => str.length <= max;

export {
    isEmail,
    isNowOrFuture,
    isNotMoreLen
}
