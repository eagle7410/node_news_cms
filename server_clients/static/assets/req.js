import {jwtPublic} from '../../../configs/clients';
import myCrypt from '../../../utils/myCrypt';

/**
 * Get query with encode.
 * @param {object} data
 * @returns {*}
 */
const getQuery = data => {

	if (Object.prototype.toString.call(data) === '[object Object]') {
		let date  = new Date();
		data.expire = (date.getTime() + date.getTimezoneOffset()*6e4) + Number(jwtPublic.expire);

		return `base=${encodeURIComponent(myCrypt(JSON.stringify(data), jwtPublic.key))}`
	}

	return null;
};

/**
 * Send to server.
 * @method send
 * @param  {string} url
 * @param  {*} data
 * @param  {*} method
 * @param  {*} headers
 * @return {Promise}
 */
const send = (url, data, method, headers) => new Promise((resolve, reject) => {
	let sendData = getQuery(data);
	let xhr = new XMLHttpRequest();

	if (method === 'GET' && sendData) {
		url += '?' + sendData;
	}

	xhr.open(method, url);
	xhr.onload = r => {
		try {
			let data = JSON.parse(r.target.responseText);

			if (data.base) {
				let decode = myCrypt(data.base, jwtPublic.key, false);

				if (process.env.NODE_ENV === 'development') {
					console.log(url + ' response data is ', data);
				}

				let resData = JSON.parse(decode);
				return resolve(resData);
			}

			resolve(data);

		} catch (e) {
			console.error('Parse responce bad', e);
			reject(e);
		}

	};

	xhr.onerror = reject;

	let head = {
		'Accept': 'application/json',
		'Content-Type': 'application/x-www-form-urlencoded',
		...headers
	};

	for (let key in head) {
		xhr.setRequestHeader(key, head[key]);
	}

	if (process.env.NODE_ENV === 'development') {
		console.log(url + ' send ' + sendData);
	}

	xhr.send(sendData);
});

/**
 * Send for save.
 * @method save
 * @param  {string} url
 * @param  {*} data
 * @param  {*} headers
 * @return {Promise}
 */
const save = (url, data, headers) => send(url, data, 'POST', headers);
/**
 * Send for get.
 * @method save
 * @param  {string} url
 * @param  {*} data
 * @param  {*} headers
 * @return {Promise}
 */
const get = (url, data, headers) => send(url, data, 'GET', headers);

export {save, get, getQuery};
