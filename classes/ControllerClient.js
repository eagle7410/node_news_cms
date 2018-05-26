const Controller     = require('./Controller');
const {buildForUser} = require('../server_clients/modules/menu-top');
const ejs            = require('ejs');
const fs             = require('fs');
const {promisify}    = require('util');
const read           = promisify(fs.readFile);

const cacheLayouts = {};
const cacheTemplates = {};

class ControllerClient extends Controller {

	static path_layout (pathViews) {
		return `${pathViews}/../layouts`;
	}

	static base_layout () {
		return 'home'
	}

	static async render (req, res, view, data = {}, layout = null) {

		const templateKey = `${this.name}/${view}`;

		if (!cacheTemplates[templateKey]) {
			const filename = `${req.pathViews}/${templateKey}.ejs`;
			cacheTemplates[templateKey] = ejs.compile((await read(filename)).toString(), {filename});
		}

		const allData = {
			...data,
			__ : res.__,
			theme : process.theme,
			langs : res.locals.getLocales(),
			lang  : res.locals.getLocale(),
			appName : process.appName,
			topMenu : buildForUser(req),
			path : req.path,
			user : req.tokenData,

		};

		const body = cacheTemplates[templateKey]({
			...allData,
			partial : function (path) {
				let cont = fs.readFileSync(`${req.pathViews}/${path}`);
				return  ejs.render(cont.toString(), this);
			}
		});
		const layoutKey = `${process.theme}/${layout || this.base_layout()}`;

		if (!cacheLayouts[layoutKey]) {
			const filename = `${this.path_layout(req.pathViews)}/${layoutKey}.ejs`;
			const layoutContent = await read(filename);

			cacheLayouts[layoutKey] = ejs.compile(layoutContent.toString(), {filename});
		}

		res.send(cacheLayouts[layoutKey]({...allData, body}));
	}
}

module.exports = ControllerClient;
