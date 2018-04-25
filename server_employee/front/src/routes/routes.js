import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Dashboard from 'src/components/Dashboard/Views/Dashboard.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile/UserProfile.vue'
import Login from 'src/components/Dashboard/Views/Login/Login.vue'
import Users from 'src/components/Dashboard/Views/Admins/Users.vue'
import Clients from 'src/components/Dashboard/Views/Clients/Clients.vue'
import News from 'src/components/Dashboard/Views/News/News.vue'
import NewsAdd from 'src/components/Dashboard/Views/News/NewsAdd.vue'

import {paths} from './paths';

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
                path: paths.profile,
                name: 'profile',
                component: UserProfile
            },
            {
                path: paths.dashboard,
                name: 'dashboard',
                component: Dashboard
            },
            {
                path: paths.employees,
                name: 'employees',
                component: Users
            },
            {
                path: paths.clients,
                name: 'clients',
                component: Clients
            },
            {
                path: paths.news,
                name: 'news',
                component: News
            },
            {
                path: paths.newsAdd,
                name: 'news-add',
                component: NewsAdd
            }
        ]
    },
    {path: '*', component: NotFound}
]

export default routes
