import Vue from 'vue'
import Vuex from 'vuex'
//modules
import auth from './modules/auth'
import clients from './modules/clients'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        clients
    }
})

export default store
