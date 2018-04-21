const fs         = require('fs');
const morgan     = require('morgan');
const bodyParser = require('body-parser');

module.exports = (app, params) => {

	//Attach middleware mask php
	app.use(require('../middleware/mask-php'));

	// Set static folder
	app.use(params.express.static(params.static));

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
	app.use(require('../middleware/jwt-checker'));

	// TODO: Back
	app.get('/', function (req, res) {
		res.send('hello, world!')
	});

	//Add router
	app.use(params.router);

	app.use((req, res) => res.status(404).json({message: 'Not found'}));

}
