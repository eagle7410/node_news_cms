import Vue from 'vue'
import VueRouter from 'vue-router'
import 'vue-material/dist/vue-material.min.css'
import VueMaterial from 'vue-material'
import store from './store/store'

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import GlobalMixins from './globalMixins'
import Notifications from './plugins/Notification'
import SideBar from './plugins/Sidebar'
import AuthProvider from './plugins/ApiProvider'
import App from './App'

// router setup
import routes from './routes/routes'

// library imports
import Chartist from 'chartist'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/material-dashboard.scss'
import 'es6-promise/auto'

// Extends
require('./exends/date');

// plugin setup
Vue.use(VueRouter)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(GlobalMixins)
Vue.use(Notifications)
Vue.use(SideBar)
Vue.use(AuthProvider)
Vue.use(VueMaterial)

// configure router
const router = new VueRouter({
    routes, // short for routes: routes
    linkActiveClass: 'active'
})

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
    get() {
        return this.$root.Chartist
    }
})

/**
 * Check rights for next page.
 */
router.beforeEach((to, from, next) => {
    const {groups} = to.meta;

    if (!groups || !groups.length) {
        return next();
    }

    const userGroups = store.state.auth.user.groups;

    if (!Array.isArray(userGroups) || !groups.length) {
        return next('not-found');
    }

    for (let group of userGroups) {
        if (groups.includes(group)) {
            return next();
        }
    }

    next('not-found');

})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
    data: {
        Chartist: Chartist
    }
})
