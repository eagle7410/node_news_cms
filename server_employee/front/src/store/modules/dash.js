export default {
    state: {
        countClients: 0,
        countClientsToday: 0,
        countNews: 0,
        countNewsToday: 0,
        chartNews : {labels: [], series: []},
        chartClients : {labels: [], series: []},
    },
    mutations : {
        setDashData : (state, data) => {
            for (let prop in state) {
                state[prop] = data[prop];
            }
        }
    }
};
