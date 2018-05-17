## Description of project folders and files  
Root folder  
├── classes   
│   ├── Controller.js  -- "This is base class for controllers."  
│   ├── ControllerClient.js  -- "This is base class for client application."  
│   ├── ControllerEmployee.js  -- "This is base class for employee application."  
│   ├── DateCustom.js  -- "This is extended global class Date."  
│   ├── ErrorHttp.js  -- "This is class throw http error."  
│   ├── ErrorModelValidation.js  -- "This is extended global class Error and set name Validation Error."  
│   ├── ModelSequelize.js  -- "This is class for create sequelize model."  
│   └── Router.js  -- "This class combines controller and http queries."  
├── cli  -- "Folder for store console util."  
├── client-app.jpg   
├── configs   
│   ├── clients.json  -- "Config for client application."  
│   ├── database.json  -- "Config for database."  
│   ├── email.json  -- "Config for email sender."  
│   └── employee.json  -- "Config for employee application."  
├── configs_example   
├── constants   
│   └── groups.js  -- "Employee users groups."  
├── emp-app-after-auth.jpg   
├── emp-start-page.jpg   
├── logs   
│   ├── Clients News   
│   │   ├── errors.log  -- "Console log errors for clients application."  
│   │   └── info.log  -- "Console log for clients application."  
│   ├── Employee   
│   │   ├── errors.log  -- "Console log errors for employee application."  
│   │   └── info.log  -- "Console log for employee application."  
│   ├── access-Clients News.log  -- "Request log for client application."  
│   ├── access-Employee.log  -- "Request log for employee application."  
│   └── apply-migration.json.log  -- "Log executed migrations."  
├── middleware   
│   ├── mask-php.js  -- "Set php headers to response."  
│   └── token-checker.js  -- "Check auth tokens."  
├── migration   
│   ├── mongo   
│   ├── mysql   
│   └── pgsql   
├── models   
│   ├── mongo   
│   ├── mysql   
│   └── pgsql   
├── modules   
│   ├── configure-app.js  -- "Configure express application."  
│   ├── configure-process.js  -- "Configure global process object."  
│   ├── configure-translate.js  -- "Configure i18n and atttach to express application."  
│   ├── data-converter  -- "Convert java script object to pdf or excel."  
│   ├── http-server.js  -- "Extend and create http server."  
│   ├── logger.js  -- "Add message to logs."  
│   ├── mail  -- "Send to specified email."  
│   └── validators.js  -- "Different validation utils."  
├── server_clients  -- "This folder is storage for client application."  
│   ├── controllers   
│   ├── entry.js  -- "This is entry point for start client application."  
│   ├── layouts   
│   │   └── source_x  -- "This is default layout."  
│   ├── locales  -- "Folder for store translate phrases."  
│   ├── modules   
│   │   └── menu-top.js  -- "This is module for build top menu."  
│   ├── processes.json  -- "This is config for pm2."  
│   ├── router.js  -- "This is build routes for applications."  
│   ├── static  -- "This folder is storage for static files."  
│   └── views   
├── server_employee  -- "This folder is storage for employee application."  
│   ├── controllers   
│   ├── entry.js  -- "This is entry point for start employee application."  
│   ├── front   
│   │   ├── src   
│   │   │   ├── App.vue   
│   │   │   ├── assets   
│   │   │   ├── components  -- "Folder for [vue components](https://vuejs.org/v2/guide/plugins.html)."  
│   │   │   ├── exends   
│   │   │   │   └── date.js  -- "Extends window.Date class."  
│   │   │   ├── globalComponents.js  -- "Annotation of global [components](https://vuejs.org/v2/guide/components.html)."  
│   │   │   ├── globalDirectives.js  -- "Annotation of global [directives](https://vuejs.org/v2/guide/custom-directive.html)."  
│   │   │   ├── globalMixins.js  -- "Annotation of global global [mixins](https://vuejs.org/v2/guide/mixins.html)."  
│   │   │   ├── main.js  -- "Build [VUE](https://vuejs.org/) app."  
│   │   │   ├── plugins  -- "Folder for [vue plugins](https://vuejs.org/v2/guide/plugins.html)."  
│   │   │   ├── routes  -- "[Vue routing](https://vuejs.org/v2/guide/routing.html) ."  
│   │   │   │   ├── paths.js  -- "Annotation routing paths."  
│   │   │   │   └── routes.js  -- "Annotation routes."  
│   │   │   ├── store  -- "[Vuex store folder](https://vuex.vuejs.org/en/getting-started.html) ."  
│   │   │   └── utils   
│   │   └── static  -- "This folder is storage for static files."  
│   ├── locales  -- "Folder for store translate phrases."  
│   ├── modules   
│   │   └── left-menu.js  -- "This is module for build  left menu."  
│   ├── processes.json  -- "This is config for pm2."  
│   ├── router.js  -- "This is build routes for applications."  
│   └── static  -- "This folder is storage for static files."  
└── utils   
# [BACK](https://github.com/eagle7410/node_news_cms#project-folders-and-files)