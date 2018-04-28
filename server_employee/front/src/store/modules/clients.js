export default {
    state: {
        columns: [
            'email',
            'name',
            'surname',
            'is_active',
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
        loadPage: 0,
        filters : {
            is_active  : -1,
            is_deleted : -1
        }
    },
    mutations: {
        updateClient (state, client) {
            for (let index in state.clients) {
                if (state.clients[index]._id === client._id) {
                    state.clients[index] = client;
                    state.clients = [].concat(state.clients);
                    break;
                }
            }
        },
        setClientsByPage(state, data) {
            state.clients = data.docs;
            state.currentPage = data.currentPage;
            state.countPages = data.countPages;
            state.countTotal = data.countTotal;
            state.loadPage = 0;
        },
        loadRun (state) {
            state.loadPage = 1;
        },
        loadStop (state) {
            state.loadPage = 0;
        },
        setFilterIsDeleted (state, value) {
            state.filters.is_deleted = value;
        },
        setFilterIsActive (state, value) {
            state.filters.is_active = value;
        }
    },
    actions: {
        async setCurrentPageClients({commit, state}, {page, app}) {
            try {

                commit('loadRun');

                let data = await app.$api.clients({
                    page,
                    pageSize   : state.pageSize,
                    is_active  : state.filters.is_active,
                    is_deleted : state.filters.is_deleted,

                });

                commit('setClientsByPage', data)

            } catch (err) {

                commit('loadStop');

                console.error('$api.clients err', err);
                app.notifyError(app.__t('Error get news'));
            }

        }
    }
}
