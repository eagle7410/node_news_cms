export default {
    state: {
        columns: [
            'title',
            'author',
            'publish_at',
            'created_by',
            'created_at',
            'updated_by',
            'updated_at',
            'is_active',
            'actions'
        ],
        news : []
    },
    mutations: {
        setNews (state, data) {
           state.news = data
        }
    }
}
