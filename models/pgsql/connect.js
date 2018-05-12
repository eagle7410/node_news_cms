const Sequelize = require('sequelize');

// Get config
if (process.isTest === undefined) {
	process.isTest = false;
}

const {pgsql} = require('../../configs/database');

const db = new Sequelize(pgsql.database + (process.isTest ? '_test': ''), pgsql.username, pgsql.password, {

	host: pgsql.host,
	port: pgsql.port,
	dialect: 'postgres',

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
});

process.db = db;
module.exports = db;
