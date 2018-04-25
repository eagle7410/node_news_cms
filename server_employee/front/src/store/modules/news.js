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
        news: [],
        steep: 2,
        pageSize: 15,
        countPages: 0,
        currentPage: 0,
        countTotal : 0,
        setCurrentPage: 'setCurrentPageNews',
        loadPage: -1,
    },
    mutations: {
        setNewsByPage(state, data) {
            state.news = data.docs;
            state.currentPage = data.currentPage;
            state.countPages = data.countPages;
            state.countTotal = data.countTotal;
        },
        setLoadPageNews(state, page) {
            state.loadPage = page;
        },
        clearLoadPageNews(state) {
            state.loadPage = -1;
        }
    },
    actions: {
        async setCurrentPageNews({commit, state}, {page, app}) {
            try {
                commit('setLoadPageNews', page);

                let data = await app.$authApi.news({
                    page,
                    pageSize : state.pageSize
                });

                commit('setNewsByPage', data)

            } catch (err) {
                console.error('$authApi.news err', err);
                app.notifyError(app.__t('Error get news'));
            }

            commit('clearLoadPageNews', page);
        }
    }
}
