import {get, save} from '../../../utils/req';
const controller = 'app';

export default {
    async auth(data) {
        return await this._not_auth_send(save, controller + '/auth', data);
    },
    async init() {
        return await this._not_auth_send(get, controller + '/init');
    }
};
