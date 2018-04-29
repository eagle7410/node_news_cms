import {get, save} from '../../../utils/req';
const controller = 'app';

export default {
    async auth(data) {
        const lang = localStorage.getItem("lang");
        return await this._not_auth_send(save, controller + '/auth', {...data, lang});
    },
    async init() {
        const lang = localStorage.getItem("lang");
        return await this._not_auth_send(get, controller + '/init', {lang});
    }
};
