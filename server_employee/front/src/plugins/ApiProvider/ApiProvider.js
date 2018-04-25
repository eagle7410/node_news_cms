import {get, save} from '../../utils/req';
import {auth} from '../../apis/app';
import {port} from '../../../../../configs/employee';

let urlBase;

if (process.env.NODE_ENV === 'development') {
    urlBase = `http://localhost:${port}/`;
}

if (process.env.NODE_ENV === 'production') {
    urlBase = `/`;
}

/**
 *
 * @param {*} e
 */
const handelError = (e) => {
    console.error('AuthProvider err', e);

    if (e.responseJSON) {
        throw e.responseJSON.error;
    }

    throw e
};

class ApiProvider {
    constructor() {
        this._store = {};
        this._commit = () => {
        };
    }

    setStore(store, commit) {
        this._store = store;
        this._commit = commit;
    }

    async getNewsById(id) {
        const result = await this._send(get, 'news/one-news', {id});
        return result.news ? result.news : result;
    }
    async news(data = {}) {
        const result = await this._send(get, 'news/news', data);
        return result.docs ? result : result.list;
    }

    async saveNews(news) {
        const result = await this._send(save, 'news/save', news);
        return result;
    }
    async newsSetActive(id, is_active) {
        const result = await this._send(save, 'news/set-active', {id, is_active});
        return result;
    }

    async _send(method, controllerAction, data = {}) {
        try {

            let res = await method(
                urlBase + controllerAction,
                {
                    ...data,
                    token: this._store.token
                }
            );

            if (res.name === 'TokenExpiredError') {
                let authData = await auth({
                    email: this._store.email,
                    password: this._store.password,
                    is_update: true
                });

                this._commit('setToken', authData.token);

                res = await method(
                    urlBase + controllerAction,
                    {
                        ...data,
                        token: this._store.token
                    }
                );
            }

            return res;

        } catch (e) {
            handelError(e);
        }
    }
}

export default ApiProvider;
