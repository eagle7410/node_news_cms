import {save} from './req'
import Cookies from './Cookies'

let api = null;

class Api {
	constructor() {
		this.token = '';
	}

	async login(data) {
		let result = await save('/auth/login', data);

		if (!result.token) {
			return false;
		}

		Cookies.set('token', result.token, {expires :144e5});

		return true;
	}

}

class ApiSingleton {
	static instance() {
		if (!api) {
			api = new Api();
		}

		return api;
	}
}

export default ApiSingleton;
