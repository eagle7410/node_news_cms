import {get, save} from '../../../utils/req';
const controller = 'notifications';

export default {
    async Notifications(data = {}) {
        return await this._send(get, controller + '/all_by_page', data);
    },
    async NotificationsSave(row) {
        return await this._send(save, controller + '/save', row);
    },
    async NotificationsRead(id) {
        return await this._send(save, controller + '/read', {id});
    }
};
