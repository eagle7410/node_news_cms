import {jwtPublic} from '../../../../configs/employee';
import {create, decode} from '../../../../utils/jwt';

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
    let xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.onload = r => {
        try {
            let data = JSON.parse(r.target.responseText);

            if (data.hash) {
                 return decode(jwtPublic, data.hash).then(resolve, reject);
            }

        } catch (e) {
            console.error('Prase responce bad', e);
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

    let sendData = null;

    if (Object.prototype.toString.call(data) === '[object Object]') {
        sendData = `hash=${encodeURIComponent(create(jwtPublic, data))}`;
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
/**
 * Send for delete.
 * @method save
 * @param  {string} url
 * @param  {*} data
 * @param  {*} headers
 * @return {Promise}
 */
const move = (url, data, headers) => send(url, data, 'DELETE', headers);
/**
 * Send for update.
 * @method save
 * @param  {string} url
 * @param  {*} data
 * @param  {*} headers
 * @return {Promise}
 */
const update = (url, data, headers) => send(url, data, 'PUT', headers);

export {save, get, move, update};
