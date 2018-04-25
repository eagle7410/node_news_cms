const baseDash = '/admin';
const baseLogin = '/';

/**
 *
 * @type {{login: string, profile: string, dashboard: string, employees: string, clients: string, newsEdit: string, newsAdd: string, news: string}}
 */
const paths = {
    login     : '',
    profile   : 'user-profile',
    dashboard : 'dashboard',
    employees : 'users-admin',
    clients   : 'clients',
    newsEdit  : 'news-add',
    newsAdd   : 'news-edit',
    news      : 'news'
};

/**
 *
 * @type {{login: string, profile: string, dashboard: string, employees: string, clients: string, newsEdit: string, newsAdd: string, news: string}}
 */
let fullPath = {};

for (let path in paths) {
    switch (path) {
        case 'login' :
            fullPath[path] = baseLogin;
        default:
            return fullPath[path] = `${baseDash}/${paths[path]}`;
    }
}

export  {
    paths,
    baseDash,
    baseLogin,
    fullPath
};
