import {get, save} from '../utils/req';

const urlBase = 'http://localhost:3537/app';
const handelError = (e) => {
    if (e.responseJSON) {
        throw e.responseJSON.error;
    }

    throw e
};
const init = async () => {
    try {
        return await get(urlBase + '/init');
    } catch (e) {
        handelError(e);
    }
};

const auth = async (data) => {
    try {
        return await save(urlBase + '/auth', data);
    } catch (e) {
        handelError(e);
    }
}
export {
    init,
    auth
};
