import {get, save} from '../../../utils/req';
const controller = 'employees';

export default {
    async Employees(data = {}) {
        return await this._send(get, controller + '/all_by_page', data);
    },
    async EmployeesSave(row) {
        return await this._send(save, controller + '/save', row);
    },
    async EmployeesActivate(id) {
        return await this._send(save, controller + '/activate', {id});
    },
    async EmployeesSetDelete(id, is_deleted) {
        return await this._send(save, controller + '/set-deleted', {id, is_deleted});
    },
    async getEmployeesById(id) {
        return await this._send(get, controller + '/one', {id});
    }
};
