import AuthProvider from './AuthProvider'

const installer = {

    install(Vue) {
        let authProvider = new AuthProvider();

        Object.defineProperty(Vue.prototype, '$authApi', {
            get() {
                return authProvider
            }
        })

    }
}

export default installer
