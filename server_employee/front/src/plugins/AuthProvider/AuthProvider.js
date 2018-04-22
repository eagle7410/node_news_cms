import {get} from '../../utils/req';
import {auth} from '../../apis/app';
import {port} from '../../../../../configs/employee';

const urlBase = `http://localhost:${port}/`;

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

class AuthProvider {
    constructor() {
        this._store = {};
        this._commit = () => {
        };
    }

    setStore(store, commit) {
        this._store = store;
        this._commit = commit;
    }

    async news() {
        let result = await this._send(get, 'news/news');
        return result.list;
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

export default AuthProvider;
