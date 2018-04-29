import controllers from './controllers'
import {getQuery} from '../../utils/req';
let urlBase;

if (process.env.NODE_ENV === 'development') {
    const {port} = require('../../../../../configs/employee');
    urlBase = `http://localhost:${port}/`;
}

if (process.env.NODE_ENV === 'production') {
    urlBase = `/`;
}

class ApiProvider {
    constructor() {
        this._store = {};
        this._commit = () => {};

        Object.values(controllers).map(controller => Object.assign(this, controller))
    }

    setStore(store, commit) {
        this._store = store;
        this._commit = commit;
    }

    srcLink(controllerAction, data = {}) {
        return `${urlBase + controllerAction}?${
                getQuery({
                    ...data,
                    token: this._store.token
                })
            }`;
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
                let authData = await this.auth({
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

            if (res.code) {
                throw new Error(`[code ${res.code}] ${res.message}`);
            }

            return res;

        } catch (e) {
            ApiProvider.handleError(e);
        }
    }
    async _not_auth_send(method, controllerAction, data = {}) {
        try {
            return await method(urlBase + controllerAction, data );
        } catch (e) {
            ApiProvider.handleError(e);
        }
    }

    static handleError (e) {
        console.error('AuthProvider err', e);

        if (e.responseJSON) {
            throw e.responseJSON.error;
        }

        throw e
    }
}

export default ApiProvider;
