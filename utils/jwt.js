const jwt = require('jsonwebtoken');

/**
 * Decode token
 * @param {{key : String, expire : String|Number }} jstKeyData
 * @param {String} token
 * @returns {Promise<*>}
 */
const decode = async (jstKeyData, token) => jwt.verify(token, jstKeyData.key);

/**
 * Create token
 * @param {{key : String, expire : String|Number }} jstKeyData
 * @param {{}} data
 * @returns {*}
 */
const create = (jstKeyData, data) => jwt.sign(data, jstKeyData.key, {expiresIn: jstKeyData.expire});

module.exports = {
	decode,
	create,
};
