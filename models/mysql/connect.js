const Sequelize = require('sequelize');
// Get config
const {mysql} = require('../../configs/database');

const db = new Sequelize(mysql.database, mysql.username, mysql.password, {
	host: mysql.host,
	port: mysql.port,
	dialect: 'mysql',
	operatorsAliases: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
});

process.db = db;
module.exports = db;
