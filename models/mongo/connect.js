//Import the mongoose module
let mongoose = require('mongoose');
// Get config
const {mongo} = require('../../configs/database');

//Set up default mongoose connection

mongoose.connect(buildConnectionUrl());

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


function buildConnectionUrl() {
	const auth = mongo.username && mongo.password ? `${mongo.username}:${mongo.password}@` : '';
	const host = `${mongo.host || '127.0.0.1'}:${mongo.port || '27017'}`;

	// Build querystring
	let dbName = mongo.database || 'cms_news';

	if (process.isTest) dbName += '_test';

	const properties = `/${dbName}?authSource=${mongo.authDB || 'admin'}`;

	return `mongodb://${auth}${host}${properties}`;
}


module.exports = db;
