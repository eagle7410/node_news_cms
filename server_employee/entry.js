// Server for control.
const express    = require('express');
const i18n = require("i18n");
const configApp  = require('../configs/employee.json');
const {drive}    = require('../configs/database.json');
const port       = process.env.port || configApp.port || 3537;
const app        = express();
const http       = require('http').Server(app);
const fs         = require('fs');
const morgan     = require('morgan');
const bodyParser = require('body-parser');

process.env.isDev  = configApp.isDev;
process.logger = require('../modules/logger.js')('EmployeeApp');

// Include multi lang
i18n.configure({
	locales:['en', 'ru'],
	directory: __dirname + '/locales',
	defaultLocale: 'ru',
});
app.use(i18n.init);

// Connect to database
require(`../models/${drive}/connect`);

//Attach middleware mask php
app.use(require('../middleware/mask-php'));

// Set static folder
app.use(express.static('static'));

//Attach middleware
	// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
	// parse application/json
app.use(bodyParser.json());

if (configApp.isDev) {
	// require for dev cross domains.
	const cors = require('cors');
	app.use(cors());
}

// log all requests to access.log
if (configApp.isDev) app.use(morgan('dev'));
app.use(morgan('common', {stream: fs.createWriteStream(`${__dirname}/../logs/access-employee.log`, {flags: 'a'})}));

app.get('/', function (req, res) {
	res.send('hello, world!')
});
//Add router
app.use(require('./router'));

app.use((req, res) => res.status(400).json({message:'Not found'}));

http.listen(port, () =>
	console.log(
		`\n\n =======================================\n`,
		`=== EMPLOYEE APP READY IN PORT ${port} ===\n`,
		`=======================================\n`,
		`link in browser http://localhost:${port}\n\n`,
	)
);

module.exports = http;
