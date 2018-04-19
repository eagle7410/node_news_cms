export default {
    state: {
        email: 'test@mail.com',
        password: 'test2Testing',
        token: ''
    },
    mutations: {
        setEmail (state, email) {
            state.email = email
        },
        setPass (state, pass) {
            state.password = pass
        },
        setToken (state, token) {
            state.token = token
        }
    }
}
