// Server for control.
require('../modules/configure-process')('clients');
const express = require('express');
const app     = express();
const http    = require('../modules/http-server')(app);

// Include multi lang
require('../modules/configure-translate')(app, __dirname + '/locales');
// INclude  ejs-locals
app.engine('ejs', require('ejs-locals'));
// Connect to database
require(`../models/${process.drive}/connect`);

require('../modules/configure-app')(app, {
	assets : __dirname + '/static',
	router : require('./router')('home', 'show'),
	views  : { engine : 'ejs', dir: `${__dirname}/views`},
	express,
});

http.run();

module.exports = http;
