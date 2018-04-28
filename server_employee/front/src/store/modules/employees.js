export default {
    state: {
        columns: [
            'email',
            'name',
            'surname',
            'is_active',
            'groups',
            'updated_at',
            'updated_by',
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
        setCurrentPage: 'setCurrentPageEmployees',
        loadPage: 0,
        filters : {
            is_active  : -1,
            is_deleted : -1,
        }
    },
    mutations: {
        updateEmployees (state, row) {
            for (let index in state.list) {
                if (state.list[index]._id === row._id) {
                    state.list[index] = row;
                    state.list = [].concat(state.list);
                    break;
                }
            }
        },
        setEmployeesByPage(state, data) {
            state.list = data.docs;
            state.currentPage = data.currentPage;
            state.countPages = data.countPages;
            state.countTotal = data.countTotal;
            state.loadPage = 0;
        },
        loadRunEmployees (state) {
            state.loadPage = 1;
        },
        loadStopEmployees (state) {
            state.loadPage = 0;
        },
        setFilterIsActiveEmployees (state, value) {
            state.filters.is_active = value;
        },
        setFilterIsDeleteEmployees (state, value) {
            state.filters.is_deleted = value;
        }
    },
    actions: {
        async setCurrentPageEmployees({commit, state}, {page, app}) {
            try {

                commit('loadRunEmployees');

                let data = await app.$api.Employees({
                    page,
                    pageSize   : state.pageSize,
                    is_active  : state.filters.is_active,
                    is_deleted  : state.filters.is_deleted,

                });

                commit('setEmployeesByPage', data)

            } catch (err) {

                commit('loadStopEmployees');

                console.error('$api.Employees err', err);
                app.notifyError(app.__t('Error get Employees'));
            }

        }
    }
}
