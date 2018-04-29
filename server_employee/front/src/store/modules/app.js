export default {
    state: {
        isLoad : true,
        phrases : {
            sing_in  : 'Sing in',
            email    : 'Email',
            password : 'Password',
            try      : 'TRY'
        },
        langs : ['en'],
        lang : 'en'
    },
    mutations: {
        setLoad (state, isload) {
            state.isLoad = isload;
        },
        setLangs (state, langs) {
            state.langs = langs;
        },
        setLang (state, lang) {
            window.localStorage.setItem('lang', lang);
            state.lang = lang
        },
        setPhrases (state, phrases) {
            state.phrases = phrases;
        }
    }
}
