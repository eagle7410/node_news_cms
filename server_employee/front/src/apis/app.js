import {get, save} from '../utils/req';
import {port} from '../../../../configs/employee';

const urlBase = `http://localhost:${port}/app`;

/**
 *
 * @param {*} e
 */
const handelError = (e) => {
    if (e.responseJSON) {
        throw e.responseJSON.error;
    }

    throw e
};

/**
 *
 * @returns {Promise<void>}
 */
const init = async () => {
    try {
        return await get(urlBase + '/init');
    } catch (e) {
        handelError(e);
    }
};

/**
 *
 * @param {object}data
 * @returns {Promise<void>}
 */
const auth = async (data) => {
    try {
        return await save(urlBase + '/auth', data);
    } catch (e) {
        handelError(e);
    }
};

export {
    init,
    auth
};
