const baseDash = '/admin';
const baseLogin = '/';

/**
 *
 * @type {{login: string, logout: string, profile: string, dashboard: string, employees: string, clients: string, clientAdd: string, clientEdit: string, newsEdit: string, newsAdd: string, news: string, Employees: string, EmployeesEdit: string, EmployeesAdd: string, Notifications: string, NotificationsAdd: string}}
 */
const paths = {
    login: '',
    logout : '',
    profile: 'profile',
    dashboard: 'dashboard',
    employees: 'users-admin',
    clients: 'clients',
    clientAdd: 'client-add',
    clientEdit: 'client-edit',
    newsEdit: 'news-edit',
    newsAdd: 'news-add',
    news: 'news',
    Employees : 'employees',
    EmployeesEdit : 'Employee-edit',
    EmployeesAdd : 'Employee-add',
    Notifications : 'notifications',
    NotificationsAdd : 'notifications-add',
};

/**
 *
 * @type {{login: string, logout: string, profile: string, dashboard: string, employees: string, clients: string, clientAdd: string, clientEdit: string, newsEdit: string, newsAdd: string, news: string, Employees: string, EmployeesEdit: string, EmployeesAdd: string, Notifications: string, NotificationsAdd: string}}
 */
let fullPath = {};

for (let path in paths) {
    switch (path) {
        case 'login' :
        case 'logout' :
            fullPath[path] = baseLogin;
            break;

        default:
            fullPath[path] = `${baseDash}/${paths[path]}`;
    }
}

export {
    paths,
    baseDash,
    baseLogin,
    fullPath
};
