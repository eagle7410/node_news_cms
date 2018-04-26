import Vue from 'vue'
import Vuex from 'vuex'
//modules
import auth from './modules/auth'
import clients from './modules/clients'
import clientOne from './modules/clients-one'
import app from './modules/app'
import news from './modules/news'
import newsOne from './modules/news-one'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        clients,
        app,
        news,
        newsOne,
        clientOne
    }
});

export default store
