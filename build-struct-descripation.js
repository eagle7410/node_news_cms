const fs          = require('fs');
const {promisify} = require('util');
const writter     = promisify(fs.writeFile);
const TreeView    = require('./utils/tree-view');

void async function run() {

	const treeView = new TreeView();
	const optionForShowOnlyNameDir = {
		isUsePath : false,
		isOnlyName : true,
	};

	await treeView.scan(__dirname, {
		'static' : optionForShowOnlyNameDir,
		utils : optionForShowOnlyNameDir,
		mongo : optionForShowOnlyNameDir,
		mysql : optionForShowOnlyNameDir,
		pgsql : optionForShowOnlyNameDir,
		source_x : optionForShowOnlyNameDir,
		libs : optionForShowOnlyNameDir,
		configs_example : optionForShowOnlyNameDir,
		store : optionForShowOnlyNameDir,
		controllers : optionForShowOnlyNameDir,
		components : optionForShowOnlyNameDir,
		assets : optionForShowOnlyNameDir,
		locales : optionForShowOnlyNameDir,
		build : optionForShowOnlyNameDir,
		templates : optionForShowOnlyNameDir,
		views : optionForShowOnlyNameDir,
		console_util : optionForShowOnlyNameDir,
		'data-converter' : optionForShowOnlyNameDir,
		'mail' : optionForShowOnlyNameDir,
		plugins : optionForShowOnlyNameDir,
	});

	let content = treeView.toContent([
		{
			regExp : /static/,
			text : 'This folder is storage for static files.',
		},
		{
			regExp : /(.*)\/server_employee$/,
			text : 'This folder is storage for employee application.',
		},
		{
			regExp : /(.*)\/server_employee\/entry\.js$/,
			text : 'This is entry point for start employee application.',
		},
		{
			regExp : /(.*)\/server_clients$/,
			text : 'This folder is storage for client application.',
		},
		{
			regExp : /(.*)\/server_clients\/entry\.js$/,
			text : 'This is entry point for start client application.',
		},
		{
			regExp : /(.*)\/source_x$/,
			text : 'This is default layout.',
		},
		{
			regExp : /(.*)\/router\.js$/,
			text : 'This is build routes for applications.',
		},
		{
			regExp : /classes\/Controller\.js/,
			text : 'This is base class for controllers.',
		},
		{
			regExp : /classes\/ControllerClient\.js/,
			text : 'This is base class for client application.',
		},
		{
			regExp : /classes\/ControllerEmployee\.js/,
			text : 'This is base class for employee application.',
		},
		{
			regExp : /classes\/DateCustom\.js/,
			text : 'This is extended global class Date.',
		},
		{
			regExp : /classes\/ErrorHttp\.js/,
			text : 'This is class throw http error.',
		},
		{
			regExp : /classes\/ErrorModelValidation\.js/,
			text : 'This is extended global class Error and set name Validation Error.',
		},
		{
			regExp : /classes\/ModelSequelize\.js/,
			text : 'This is class for create sequelize model.',
		},
		{
			regExp : /classes\/Router\.js/,
			text : 'This class combines controller and http queries.',
		},
		{
			regExp : /processes.json/,
			text : 'This is config for pm2.'
		},
		{
			regExp : /modules\/left-menu\.js/,
			text : 'This is module for build  left menu.'
		},
		{
			regExp : /modules\/menu-top\.js/,
			text : 'This is module for build top menu.'
		},
		{
			regExp : /\/locales$/,
			text : 'Folder for store translate phrases.'
		},
		{
			regExp : /\/console_util\/apply-migrate.js/,
			text : 'Folder for store translate phrases.'
		},
		{
			regExp : /\/console_util$/,
			text : 'Folder for store console util.'
		},
		{
			regExp : /constants\/groups\.js$/,
			text : 'Employee users groups.'
		},
		{
			regExp : /Clients\ News\/errors\.log$/,
			text : 'Console log errors for clients application.'
		},
		{
			regExp : /Clients\ News\/info\.log$/,
			text : 'Console log for clients application.'
		},
		{
			regExp : /Employee\/errors\.log$/,
			text : 'Console log errors for employee application.'
		},
		{
			regExp : /Employee\/info\.log$/,
			text : 'Console log for employee application.'
		},
		{
			regExp : /logs\/access-Clients\ News.log$/,
			text : 'Request log for client application.'
		},
		{
			regExp : /logs\/access-Employee.log$/,
			text : 'Request log for employee application.'
		},
		{
			regExp : /logs\/apply\-migration\.json\.log$/,
			text : 'Log executed migrations.'
		},
		{
			regExp : /configs\/clients.json$/,
			text : 'Config for client application.'
		},
		{
			regExp : /configs\/database\.json$/,
			text : 'Config for database.'
		},
		{
			regExp : /configs\/email\.json$/,
			text : 'Config for email sender.'
		},
		{
			regExp : /configs\/employee\.json$/,
			text : 'Config for employee application.'
		},
		{
			regExp : /middleware\/mask\-php\.js$/,
			text : 'Set php headers to response.'
		},
		{
			regExp : /middleware\/token\-checker\.js$/,
			text : 'Check auth tokens.'
		},
		{
			regExp : /modules\/configure\-app\.js$/,
			text : 'Configure express application.'
		},
		{
			regExp : /modules\/configure\-process\.js$/,
			text : 'Configure global process object.'
		},
		{
			regExp : /modules\/configure\-translate\.js$/,
			text : 'Configure i18n and atttach to express application.'
		},
		{
			regExp : /modules\/data\-converter$/,
			text : 'Convert java script object to pdf or excel.'
		},
		{
			regExp : /modules\/http\-server\.js$/,
			text : 'Extend and create http server.'
		},
		{
			regExp : /modules\/logger\.js$/,
			text : 'Add message to logs.'
		},
		{
			regExp : /modules\/mail$/,
			text : 'Send to specified email.'
		},
		{
			regExp : /modules\/validators\.js$/,
			text : 'Different validation utils.'
		},
		{
			regExp : /src\/exends\/date\.js$/,
			text : 'Extends window.Date class.'
		},
		{
			regExp : /src\/exends\/date\.js$/,
			text : 'Extends window.Date class.'
		},
		{
			regExp : /src\/globalComponents\.js$/,
			text : 'Annotation of global [components](https://vuejs.org/v2/guide/components.html).'
		},
		{
			regExp : /src\/globalDirectives\.js$/,
			text : 'Annotation of global [directives](https://vuejs.org/v2/guide/custom-directive.html).'
		},
		{
			regExp : /src\/globalMixins\.js$/,
			text : 'Annotation of global global [mixins](https://vuejs.org/v2/guide/mixins.html).'
		},
		{
			regExp : /src\/main\.js$/,
			text : 'Build [VUE](https://vuejs.org/) app.'
		},
		{
			regExp : /src\/components$/,
			text : 'Folder for [vue components](https://vuejs.org/v2/guide/plugins.html).'
		},
		{
			regExp : /src\/plugins$/,
			text : 'Folder for [vue plugins](https://vuejs.org/v2/guide/plugins.html).'
		},
		{
			regExp : /src\/routes\/paths\.js$/,
			text : 'Annotation routing paths.'
		},
		{
			regExp : /src\/routes\/routes\.js$/,
			text : 'Annotation routes.'
		},
		{
			regExp : /src\/routes$/,
			text : '[Vue routing](https://vuejs.org/v2/guide/routing.html) .'
		},
		{
			regExp : /src\/store$/,
			text : '[Vuex store folder](https://vuex.vuejs.org/en/getting-started.html) .'
		},
	]);
	await writter(
		`${__dirname}/struct-descrition.md`,
		`## Description of project folders and files  \n${content}\n# [BACK](https://github.com/eagle7410/node_news_cms#project-folders-and-files)`);

	process.exit();
}();
