import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Dashboard from 'src/components/Dashboard/Views/Dashboard.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile/UserProfile.vue'
import Login from 'src/components/Dashboard/Views/Login/Login.vue'
import Users from 'src/components/Dashboard/Views/Admins/Users.vue'
import Clients from 'src/components/Dashboard/Views/Clients/Clients.vue'

const routes = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/admin',
        component: DashboardLayout,
        redirect: 'user-profile',
        children: [
            {
                path: 'user-profile',
                name: 'profile',
                component: UserProfile
            },
            {
                path: 'dashboard',
                name: 'dashboard',
                component: Dashboard
            },
            {
                path: 'users-admin',
                name: 'employees',
                component: Users
            },
            {
                path: 'clients',
                name: 'clients',
                component: Clients
            }
        ]
    },
    {path: '*', component: NotFound}
]

export default routes
