export default {
    state: {
        columns: [
            'email',
            'name',
            'surname',
            'groups',
            'is_active',
            'is_deleted',
            'confirm_at',
            'confirm_by',
            'updated_at',
            'updated_by',
            'created_at',
            'created_by',
            'actions'
        ],
        clients : [],
        steep: 2,
        pageSize: 15,
        countPages: 0,
        currentPage: 0,
        countTotal : 0,
        setCurrentPage: 'setCurrentPageClients',
        loadPage: -1,
    },
    mutations: {
        updateClients (state, news) {
            for (let index in state.news) {
                if (state.news[index]._id === news._id) {
                    state.news[index] = news;
                    state.news = [].concat(state.news);
                    break;
                }
            }
        },
        setClientsByPage(state, data) {
            state.clients = data.docs;
            state.currentPage = data.currentPage;
            state.countPages = data.countPages;
            state.countTotal = data.countTotal;
        }
    },
    actions: {
        async setCurrentPageClients({commit, state}, {page, app}) {
            try {

                let data = await app.$api.clients({
                    page,
                    pageSize : state.pageSize
                });

                commit('setClientsByPage', data)

            } catch (err) {
                console.error('$api.clients err', err);
                app.notifyError(app.__t('Error get news'));
            }

        }
    }
}
