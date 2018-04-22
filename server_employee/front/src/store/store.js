import Vue from 'vue'
import Vuex from 'vuex'
//modules
import auth from './modules/auth'
import clients from './modules/clients'
import app from './modules/app'
import news from './modules/news'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        clients,
        app,
        news
    }
});

export default store
