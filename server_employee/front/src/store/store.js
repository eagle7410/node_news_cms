import Vue from 'vue'
import Vuex from 'vuex'
//modules
import auth from './modules/auth'
import clients from './modules/clients'
import app from './modules/app'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        clients,
        app
    }
});

export default store
