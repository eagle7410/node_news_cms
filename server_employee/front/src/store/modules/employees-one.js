const initial = {
    _id : null,
    email : '',
    name : '',
    surname : '',
    password : '',
    repeat : '',
    groups : [],
};
export default {
    state: {...initial},
    mutations: {
        setPropEmployees(state, {prop, val}) {
            state[prop] = val;
        },
        clearOneEmployees(state) {
            Object.assign(state, initial);
        },
        setEmployeesForEdit(state, row) {
            Object.keys(initial).map(prop => { state[prop] = row[prop] });
        }

    }
}
