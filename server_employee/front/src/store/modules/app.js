export default {
    state: {
        isLoad : true,
        phrases : {
            sing_in  : 'Sing in',
            email    : 'Email',
            password : 'Password',
            try      : 'TRY'
        }
    },
    mutations: {
        setLoad (state, isload) {
            state.isLoad = isload;
        },
        setPhrases (state, phrases) {
            state.phrases = phrases;
        }
    }
}
