const initial = {
    _id : null,
    email : '',
    name : '',
    surname : '',
    password : '',
    repeat   : ''
};
export default {
    state: {...initial},
    mutations: {
        setPassword(state, val) {
            state.password = val;
        },
        setRepeat(state, val) {
            state.repeat = val;
        },
        setEmail(state, val) {
            state.email = val;
        },
        setName(state, val) {
            state.name = val;
        },
        setSurname(state, val) {
            state.surname = val;
        },
        clearOneClient(state) {
            Object.assign(state, initial);
        },
        setClientForEdit(state, client) {
            Object.keys(initial).map(prop => { state[prop] = client[prop] });
        }

    }
}
