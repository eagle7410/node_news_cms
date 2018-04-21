// Server for control.
require('../modules/configure-process')('employee');
const express = require('express');
const app     = express();
const http    = require('../modules/http-server')(app);

// Include multi lang
require('../modules/configure-transler')(app, __dirname + '/locales');

// Connect to database
require(`../models/${process.drive}/connect`);

require('../modules/configure-app')(app, {
	static : __dirname + '/static',
	router : require('./router'),
	express,
});

http.run();

module.exports = http;
