import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Dashboard from 'src/components/Dashboard/Views/Dashboard.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile/UserProfile.vue'
import Login from 'src/components/Dashboard/Views/Login/Login.vue'
import Clients from 'src/components/Dashboard/Views/Clients/Clients.vue'
import ClientsAdd from 'src/components/Dashboard/Views/Clients/ClientsAdd.vue'
import ClientsEdit from 'src/components/Dashboard/Views/Clients/ClientsEdit.vue'
import News from 'src/components/Dashboard/Views/News/News.vue'
import NewsAdd from 'src/components/Dashboard/Views/News/NewsAdd.vue'
import NewsEdit from 'src/components/Dashboard/Views/News/NewsEdit.vue'
import Employees from 'src/components/Dashboard/Views/Employees/Employees.vue'
import EmployeesAdd from 'src/components/Dashboard/Views/Employees/EmployeesAdd.vue'
import EmployeesEdit from 'src/components/Dashboard/Views/Employees/EmployeesEdit.vue'

import {paths} from './paths';
import groups from '../../../../constants/groups';

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
                component: Dashboard,
                meta: {groups: [groups.admin]}
            },
            {
                path: paths.Employees,
                name: 'employees',
                component: Employees,
                meta: {groups: [groups.admin]}
            },
            {
                path: paths.EmployeesAdd,
                name: 'employees-add',
                component: EmployeesAdd,
                meta: {groups: [groups.admin]}
            },
            {
                path: paths.EmployeesEdit,
                name: 'employees-edit',
                component: EmployeesEdit,
                meta: {groups: [groups.admin]}
            },
            {
                path: paths.clients,
                name: 'clients',
                component: Clients,
                meta: {
                    groups: [
                        groups.admin,
                        groups.moderator,
                        groups.content,
                    ]
                }
            },
            {
                path: paths.clientAdd,
                name: 'client-add',
                component: ClientsAdd,
                meta: {
                    groups: [
                        groups.admin,
                        groups.moderator,
                    ]
                }
            },
            {
                path: paths.clientEdit,
                name: 'clients-edit',
                component: ClientsEdit,
                meta: {
                    groups: [
                        groups.admin,
                        groups.moderator,
                    ]
                }
            },
            {
                path: paths.news,
                name: 'news',
                component: News,
                meta: {
                    groups: [
                        groups.admin,
                        groups.moderator,
                        groups.content,
                    ]
                }
            },
            {
                path: paths.newsAdd,
                name: 'news-add',
                component: NewsAdd,
                meta: {
                    groups: [
                        groups.admin,
                        groups.content,
                    ]
                }
            },
            {
                path: paths.newsEdit,
                name: 'news-edit',
                component: NewsEdit,
                meta: {
                    groups: [
                        groups.admin,
                        groups.content,
                    ]
                }
            }
        ]
    },
    {path: '*', component: NotFound}
]

export default routes
