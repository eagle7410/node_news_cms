import {get} from '../../../utils/req';
const controller = 'dashboard';

export default {
    async dashInit() {
        return await this._send(get, controller + '/init');
    },

};
