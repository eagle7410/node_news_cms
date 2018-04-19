
export default {
    state: {
        columns: [
            'Uid',
            'Landing',
            'First_name',
            'Last_name',
            'Phone',
            'Email',
            'Country',
            'Date_reg',
            'Campaign_id'
        ],
        clients : []
    },
    mutations: {
        setClients (state, data) {
           state.clients = data
        }
    }
}
