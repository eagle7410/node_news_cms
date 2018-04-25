const initial = {
    _id: null,
    publish_at: new Date(),
    en: {
        title: '',
        text: '',
    },
    ru: {
        title: '',
        text: '',
    },
    author: '',
    is_active: false,
    comments: [],
    authors: [],
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
        },
        setNewForEdit(state, news) {
            [
                '_id',
                'author',
                'is_active',
                'comments',
            ].map(prop => { state[prop] = news[prop] });

            ['en', 'ru'].map(lang => {
                state[lang] = {
                    title: news.title[lang],
                    text: news.text[lang],
                };
            });

            state.publish_at = new Date(news.publish_at);
        }

    }
}
