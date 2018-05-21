// Server for control.
require('../modules/configure-process')('clients');
const express = require('express');
const app     = express();
const http    = require('../modules/http-server')(app);
const  cookieParser = require('cookie-parser');

// Set cookie parser
app.use(cookieParser());
// Include multi lang
require('../modules/configure-translate')(app, __dirname + '/locales');
// Connect to database
require(`../models/${process.drive}/connect`);

require('../modules/configure-app')(app, {
	assets : __dirname + '/static',
	router : require('./router')('news', 'show'),
	views  : { engine : 'ejs', dir: `${__dirname}/views`},
	express,
});

http.run();

module.exports = http;
