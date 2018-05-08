export default {
    state: {
        email: '',
        password: '',
        phrases: {},
        user: {},
        token: '',
        groupList: [],
        appClientName: '',
        appClientHome: '',
    },
    mutations: {
        setEmail(state, email) {
            state.email = email
        },
        setPass(state, pass) {
            state.password = pass
        },
        setToken(state, token) {
            state.token = token
        },
        setProfile(state, user) {
            state.user = user
        },
        setAuthPhrases(state, phrases) {
            state.phrases = phrases
        },
        setGroupList(state, groups) {
            state.groupList = groups
        },
        setDataAfterLogin(state, data) {
            [
                'token',
                'user',
                'phrases',
                'groupList',
                'countUnread',
                'appClientName',
                'appClientHome'
            ].map(prop => {
                state[prop] = data[prop]
            });
        },
        reset(state) {
            state.token = '';
            state.email = '';
            state.password = '';
            state.user = '';

            if (process.env.NODE_ENV === 'development') {
                // state.email = 'verycooleagle@gmail.com';
                // state.password = 'Verycooleagle1';
                state.email = 'test@mail.com';
                state.password = 'test2Testing';
            }
        }
    }
}
