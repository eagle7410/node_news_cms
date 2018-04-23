const initial = {
    _id: null,
    publish_at: new Date(),
    en: {
        title: '',
        text: '',
        text_prev: '',
    },
    ru: {
        title: '',
        text: '',
        text_prev: '',
    },
    author: '',
    is_active: false,
    comments: [],
    authors: []
};
export default {
    state: {...initial},
    mutations: {
        setTextProp(state, {prop, val, lang}) {
            state[lang][prop] = val;
        },
        setAuthor(state, val) {
            state.author = val;
        },
        setPublish_at(state, val) {
            state.publish_at = val;
        },
        clearOneNews(state) {
            state = {...initial};
        }
    }
}
