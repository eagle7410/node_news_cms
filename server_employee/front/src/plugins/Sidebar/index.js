import Sidebar from './SideBar.vue'

const SidebarStore = {
    showSidebar: false,
    sidebarLinks: [
        {
            name: 'Dashboard',
            icon: 'dashboard',
            path: '/admin/dashboard'
        },
        {
            name: 'User Profile',
            icon: 'fa fa-user-circle',
            path: '/admin/user-profile'
        },
        {
            name: 'Admin users',
            icon: 'fa fa-user-secret',
            path: '/admin/users-admin'
        },
        {
            name: 'Clients',
            icon: 'fa fa-users',
            path: '/admin/clients'
        }
    ],
    displaySidebar (value) {
        this.showSidebar = value
    }
}

const SidebarPlugin = {

    install (Vue) {
        Vue.mixin({
            data () {
                return {
                    sidebarStore: SidebarStore
                }
            }
        })

        Object.defineProperty(Vue.prototype, '$sidebar', {
            get () {
                return this.$root.sidebarStore
            }
        })
        Vue.component('side-bar', Sidebar)
    }
}

export default SidebarPlugin
