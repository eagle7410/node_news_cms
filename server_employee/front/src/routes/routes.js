import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Dashboard from 'src/components/Dashboard/Views/Dashboard/Dashboard.vue'
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
import Notifications from 'src/components/Dashboard/Views/Notifications/Notifications.vue'
import NotificationsAdd from 'src/components/Dashboard/Views/Notifications/NotificationsAdd.vue'

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
        redirect: paths.profile,
        children: [
            {
                path: paths.profile,
                name: 'profile',
                component: UserProfile,
                meta: {
                    breadcrumbs : [
                        {path : paths.profile, name: 'profile'}
                    ]
                }
            },
            {
                path: paths.Notifications,
                name: 'notifications',
                component: Notifications,
                meta: {
                    breadcrumbs : [
                        {path : paths.Notifications, name: 'notifications'}
                    ]
                }
            },
            {
                path: paths.NotificationsAdd,
                name: 'notifications-add',
                component: NotificationsAdd,
                meta: {
                    breadcrumbs : [
                        {path : paths.Notifications, name: 'notifications'},
                        {path : paths.NotificationsAdd, name: 'notifications-add'}
                    ]
                }
            },
            {
                path: paths.dashboard,
                name: 'dashboard',
                component: Dashboard,
                meta: {
                    groups: [groups.admin],
                    breadcrumbs : [
                        {path : paths.dashboard, name: 'dashboard'}
                    ]
                }
            },
            {
                path: paths.Employees,
                name: 'employees',
                component: Employees,
                meta: {
                    groups: [groups.admin],
                    breadcrumbs : [
                        {path : paths.Employees, name: 'employees'}
                    ]
                }
            },
            {
                path: paths.EmployeesAdd,
                name: 'employees-add',
                component: EmployeesAdd,
                meta: {
                    groups: [groups.admin],
                    breadcrumbs : [
                        {path : paths.Employees, name: 'employees'},
                        {path : paths.EmployeesAdd, name: 'employees-add'}
                    ]
                }
            },
            {
                path: paths.EmployeesEdit,
                name: 'employees-edit',
                component: EmployeesEdit,
                meta: {
                    groups: [groups.admin],
                    breadcrumbs : [
                        {path : paths.Employees, name: 'employees'},
                        {path : paths.EmployeesEdit, name: 'employees-edit'}
                    ]
                }
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
                    ],
                    breadcrumbs : [
                        {path : paths.clients, name: 'clients'},
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
                    ],
                    breadcrumbs : [
                        {path : paths.clients, name: 'clients'},
                        {path : paths.clientAdd, name: 'client-add'}
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
                    ],
                    breadcrumbs : [
                        {path : paths.clients, name: 'clients'},
                        {path : paths.clientEdit, name: 'clients-edit'}
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
                    ],
                    breadcrumbs : [
                        {path : paths.news, name: 'news'}
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
                    ],
                    breadcrumbs : [
                        {path : paths.news, name: 'news'},
                        {path : paths.newsAdd, name: 'news-add'},
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
                    ],
                    breadcrumbs : [
                        {path : paths.news, name: 'news'},
                        {path : paths.newsEdit, name: 'news-edit'},
                    ]
                }
            }
        ]
    },
    {path: '*', component: NotFound}
]

export default routes
