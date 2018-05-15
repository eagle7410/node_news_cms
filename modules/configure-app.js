const fs         = require('fs');
const morgan     = require('morgan');
const bodyParser = require('body-parser');

module.exports = (app, {express, assets, views, router}) => {

	//Attach middleware mask php
	app.use(require('../middleware/mask-php'));

	// Set assets folder
	app.use('/static', express.static(assets));

	// Set views
	if (views) {
		const {dir, engine} = views;

		if (!dir || !engine) {
			throw new Error('Bad set views params');
		}

		app.set('view engine', engine);
		app.set("views", dir);
	}


	//Attach middleware
	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({extended: false}));
	// parse application/json
	app.use(bodyParser.json());

	if (process.isDev) {
		// require for dev cross domains.
		const cors = require('cors');
		app.use(cors());
	}

	// log all requests to access.log
	if (process.isDev) app.use(morgan('dev'));
	app.use(morgan('common', {stream: fs.createWriteStream(`${__dirname}/../logs/access-${process.appName}.log`, {flags: 'a'})}));

	//Attach middleware jwt-checke
	app.use(require('../middleware/token-checker'));

	//Add router
	app.use(router);

	app.use((req, res) => res.status(404).json({message: 'Not found'}));

}
