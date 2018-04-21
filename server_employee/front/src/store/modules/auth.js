export default {
    state: {
        email: 'test@mail.com',
        password: 'test2Testing',
        phrases : {},
        user : {},
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
        },
        setProfile (state, user) {
            state.user = user
        },
        setAuthPhrases (state, phrases) {
            state.phrases = phrases
        }
    }
}
