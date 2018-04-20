/* global $ */
import {get} from '../utils/req';

const urlBase = 'http://localhost:3537/app';

const init = async () => {
    try {

        return await get(urlBase + '/init');

    } catch (e) {
        if (e.responseJSON) {
            throw e.responseJSON.error;
        }

        throw e
    }
};

export {
    init,
};
