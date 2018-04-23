export default {
    state: {
        _id : null,
        publish_at : new Date(),
        en : {
            title : '',
            text  : '',
            text_prev : '',
        },
        ru : {
            title : '',
            text  : '',
            text_prev : '',
        },
        author : '',
        is_active : false,
        comments  : []
    },
    mutations: {
        setNews (state, data) {
            state.news = data
        }
    }
}
