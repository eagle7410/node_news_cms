const crypto = require('crypto');
const SALT_LENGTH = 16;
const passregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/;

/**
 * generates random string of characters i.e salt
 *
 * @param {number} length - Length of the random string.
 */

const getRandomString = () =>
    crypto.randomBytes(Math.ceil(SALT_LENGTH / 2))
        .toString('hex')
        .slice(0, SALT_LENGTH);

/**
 * hash password with sha512.
 *
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */

const sha512 = (string, salt) =>
    crypto.createHmac('sha512', salt).update(string).digest('hex');

module.exports = {
    createPass: password => {
        const salt = getRandomString();
        const hash = sha512(password, salt);

        return {hash, salt};
    },
    comparePass: (password, dbHash, dbSalt) => {
        const userHash = sha512(password, dbSalt);

        return dbHash === userHash;
    },

    validatePass: password => passregex.test(password)
};
