// Server for control.
require('../modules/configure-process')('employee');
// Add client app name and link.
const {name, homeLink} = require('../configs/clients');

process.appClientName = name;
process.appClientHome = homeLink;

const express = require('express');
const app     = express();
const http    = require('../modules/http-server')(app);

// Include multi lang
require('../modules/configure-translate')(app, __dirname + '/locales');

// Connect to database
require(`../models/${process.drive}/connect`);

require('../modules/configure-app')(app, {
	assets : __dirname + '/static',
	router : require('./router')(),
	express,
});

http.run();

module.exports = http;
