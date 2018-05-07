export default {
	// TODO: Back implement
    state: {
        countNotRead : 0,
        columns: [
            'type',
            'title',
            'data',
            'read_at',
            'created_at',
            'created_by',
            'actions'
        ],
        list : [],
        steep: 2,
        pageSize: 15,
        countPages: 0,
        currentPage: 0,
        countTotal : 0,
        setCurrentPage: 'setCurrentPageNotifications',
        loadPage: 0,
        filters : {
            read_at  : -1,
        }
    },
    mutations: {
        updateNotifications (state, row) {
            for (let index in state.list) {
                if (state.list[index]._id === row._id) {
                    state.list[index] = row;
                    state.list = [].concat(state.list);
                    break;
                }
            }
        },
        setNotificationsByPage(state, data) {
            state.list = data.docs;
            state.currentPage = data.currentPage;
            state.countPages = data.countPages;
            state.countTotal = data.countTotal;
            state.loadPage = 0;
        },
        loadRunNotifications (state) {
            state.loadPage = 1;
        },
        loadStopNotifications (state) {
            state.loadPage = 0;
        },
        setFilterIsActiveNotifications (state, value) {
            state.filters.is_active = value;
        }
    },
    actions: {
        async setCurrentPageNotifications({commit, state}, {page, app}) {
            try {

                commit('loadRunNotifications');

                let data = await app.$api.Notifications({
                    page,
                    pageSize   : state.pageSize,
                    is_active  : state.filters.is_active,

                });

                commit('setNotificationsByPage', data)

            } catch (err) {

                commit('loadStopNotifications');

                console.error('$api.Notifications err', err);
                app.notifyError(app.__t('Error get Notifications'));
            }

        }
    }
}
