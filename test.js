// const dirTree = require('directory-tree');
// const filteredTree = dirTree(__dirname, {exclude:/node_modules/});
//
// // TODO: clear
// console.log('filteredTree', filteredTree);


const TreeView = require('./utils/tree-view');

void async function run() {

	const treeView = new TreeView();

	await treeView.scan(__dirname, {
		'static' : {
			isUsePath : false,
			isOnlyName : true,
		},
		utils : {
			isUsePath : false,
			isOnlyName : true,
		},
		mongo : {
			isUsePath : false,
			isOnlyName : true,
		},
		mysql : {
			isUsePath : false,
			isOnlyName : true,
		},
		pgsql : {
			isUsePath : false,
			isOnlyName : true,
		},
		source_x : {
			isUsePath : false,
			isOnlyName : true,
		},
		libs : {
			isUsePath : false,
			isOnlyName : true,
		},
		configs_example : {
			isUsePath : false,
			isOnlyName : true,
		},
		store : {
			isUsePath : false,
			isOnlyName : true,
		},
		controllers : {
			isUsePath : false,
			isOnlyName : true,
		},
		components : {
			isUsePath : false,
			isOnlyName : true,
		},
		assets : {
			isUsePath : false,
			isOnlyName : true,
		},
		locales : {
			isUsePath : false,
			isOnlyName : true,
		},
		build : {
			isUsePath : false,
			isOnlyName : true,
		},
		templates : {
			isUsePath : false,
			isOnlyName : true,
		},
		views : {
			isUsePath : false,
			isOnlyName : true,
		},
	});

	// TODO: clear
	console.log(treeView.toContent([
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

	]));
	process.exit();
}();
