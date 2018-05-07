import Vue from 'vue'
import Vuex from 'vuex'
//modules
import dash from './modules/dash'
import auth from './modules/auth'
import clients from './modules/clients'
import clientOne from './modules/clients-one'
import app from './modules/app'
import news from './modules/news'
import newsOne from './modules/news-one'
import Employees from './modules/employees'
import EmployeesOne from './modules/employees-one'
// End modules

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        EmployeesOne,
        Employees,
        auth,
        clients,
        app,
        news,
        newsOne,
        clientOne,
        dash
    }
});

export default store
