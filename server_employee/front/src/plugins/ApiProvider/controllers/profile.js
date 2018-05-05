import {update} from '../../../utils/req';
const controller = 'profile';

export default {
    async profileUpdate(data) {
        let result = await this._send(update, controller + '/update', data);

        if (result.token) {
            this._commit('setToken', result.token);

            return true;
        }

        return false;
    }
};
