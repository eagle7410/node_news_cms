import {get, save} from '../../../utils/req';

export default {
    // async getNewsById(id) {
    //     const result = await this._send(get, 'clients/one', {id});
    //     return result.news ? result.news : result;
    // },
    async clients(data = {}) {
        const result = await this._send(get, 'clients/all_by_page', data);
        return result.docs ? result : result.list;
    },
    async clientSave(client) {
        const result = await this._send(save, 'clients/save', client);
        return result;
    },
    // async newsSetActive(id, is_active) {
    //     const result = await this._send(save, 'news/set-active', {id, is_active});
    //     return result;
    // }
};
