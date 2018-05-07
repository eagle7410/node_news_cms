const initial = {
    _id : null,
    subscribe : '',
    type : 'default',
    title: '',
    data: '',
};
export default {
    state: {...initial},
    mutations: {
        setPropNotifications(state, {prop, value}) {
            state[prop] = value;
        },
        clearOneNotifications(state) {
            Object.assign(state, initial);
        },
        setNotificationsForEdit(state, row) {
            Object.keys(initial).map(prop => { state[prop] = row[prop] });
        }

    }
}
