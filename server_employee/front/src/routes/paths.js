const baseDash = '/admin';
const baseLogin = '/';

/**
 *
 * @type {{login: string, logout: string, profile: string, dashboard: string, employees: string, clients: string, newsEdit: string, newsAdd: string, news: string}}
 */
const paths = {
    login: '',
    logout : '',
    profile: 'user-profile',
    dashboard: 'dashboard',
    employees: 'users-admin',
    clients: 'clients',
    newsEdit: 'news-edit',
    newsAdd: 'news-add',
    news: 'news'
};

/**
 *
 * @type {{login: string, logout: string, profile: string, dashboard: string, employees: string, clients: string, newsEdit: string, newsAdd: string, news: string}}
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
