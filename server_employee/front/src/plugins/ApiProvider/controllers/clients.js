import {get, save} from '../../../utils/req';
const controller = 'clients';

export default {
    async clients(data = {}) {
        return await this._send(get, controller + '/all_by_page', data);
    },
    async clientSave(client) {
        return await this._send(save, controller + '/save', client);
    },
    async clientSetDelete(id, is_deleted) {
        return await this._send(save, controller + '/set-deleted', {id, is_deleted});
    },
    async clientActivate(id) {
        return await this._send(save, controller + '/activate', {id});
    },
    async getClientById(id) {
        return await this._send(get, controller + '/one', {id});
    }
};
