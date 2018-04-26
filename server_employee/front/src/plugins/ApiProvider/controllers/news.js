import {get, save} from '../../../utils/req';

export default {
    async getNewsById(id) {
        const result = await this._send(get, 'news/one-news', {id});
        return result.news ? result.news : result;
    },
    async news(data = {}) {
        const result = await this._send(get, 'news/news', data);
        return result.docs ? result : result.list;
    },
    async saveNews(news) {
        const result = await this._send(save, 'news/save', news);
        return result;
    },
    async newsSetActive(id, is_active) {
        const result = await this._send(save, 'news/set-active', {id, is_active});
        return result;
    }
};
