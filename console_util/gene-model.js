const fs = require('fs');
const {promisify} = require('util');
const {ConsoleColorLog} = require('./libs/console-color');

const log = new ConsoleColorLog();
const writter = promisify(fs.writeFile);
const {drive} = require('../configs/database');
// Get params
let name;

process.argv.map(arg => {
	if (arg.includes('-n=')) {
		name = arg.trim().replace('-n=', '').toLowerCase();
	}
});

if (!name) {
	log.error('Need set name. Example use: node ./utils-console/gene-model.js -n=test');
	process.exit();
}

let template;

switch (drive) {
	case 'mongo':
		template = `// Libs
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;

let ModelSchema = new Schema({
	// For example
	// action : {
	// 	type : String,
	// 	required : true,
	// 	validate: {
	// 		validator: function(v) {
	// 			return Object.values(historyActions).includes(v);
	// 		},
	// 		message: \`\{VALUE\} not in \$\{JSON.stringify(Object.values(historyActions))\}\`
	// 	},
	// },
	// created_by : {
	// 	type : String,
	// 	required : true,
	// },
	// created_at : {
	// 	type : Date,
	// 	default : Date.now,
	// },
	// updated_by : {
	// 	type : String,
	// 	required : true,
	// },
	// updated_at : {
	// 	type : Date,
	// 	default : Date.now
	// },
});

let Model = mongoose.model('${name}', ModelSchema);

module.exports = {
	create : data => new Promise((ok, bad) => {

		let instance = new Model(data);

		instance.save(err => {
			if (err) return bad(err);
			ok(instance);
		});
	}),
	getByPage : async (page = 0, pageSize = 100, query = {}) => {
		const countTotal = await Model.count(query);
		const countPages = Math.ceil(countTotal / pageSize);

		const docs = await Model.find(query)
			.skip(pageSize * page)
			.limit(pageSize);

		return {
			countTotal,
			countPages,
			pageSize,
			currentPage : page,
			docs
		};
	},
	getById : (id) => Model.findById(id),
	getAll : (query = {}) => Model.find(query),
	updateAll: (changes, query = {}) => Model.update(query, {$set: changes}, {multi: true}),
	updateOne: (changes, query = {}) => Model.update(query, {$set: changes}),
	count : (query = {}) => Model.count(query),
	clear : (query = {}) => Model.remove(query)
};`;

		break;

	case 'mysql':
		template = `// Libs
const Sequelize = require('sequelize');
const ModelSequelize = require('../../classes/ModelSequelize');
const ErrorModelValidation = require('../../classes/ErrorModelValidation');

let ModelSchema = {
	_id: {
		type: Sequelize.DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	// For example
	// email: {
	// 	type: Sequelize.DataTypes.STRING,
	// 	allowNull: true,
	// 	set : function (val) {
	// 		if (!/.+@.*\\..*/.test(val)) {
	// 			throw new ErrorModelValidation(\`Field 'email' must be email \${val}\`);
	// 		}
	//
	// 		this.setDataValue('email', val.toLowerCase());
	// 	},
	// 	unique: true,
	// },
	// password: {
	// 	type: Sequelize.DataTypes.VIRTUAL,
	// 	set : function (pass) {
	//
	// 		if (!validatePass(pass)) {
	// 			throw new ErrorModelValidation(\`Invalid password: \${pass}\`)
	// 		}
	//
	// 		let {hash, salt} = createPass(pass);
	//
	// 		this.hash = hash;
	// 		this.salt = salt;
	// 	},
	// 	get : function () {
	// 		return this.hash;
	// 	}
	// },
	// name: {
	// 	type: Sequelize.DataTypes.STRING,
	// 	defaultValue: ''
	// },
	// is_active : {type: Sequelize.DataTypes.BOOLEAN, defaultValue: true},
	// is_deleted: {type: Sequelize.DataTypes.BOOLEAN, defaultValue: false},
	// created_at: {
	// 	type: Sequelize.DataTypes.DATE,
	// 	defaultValue: Sequelize.DataTypes.NOW
	// },
	// updated_at: {
	// 	type: Sequelize.DataTypes.DATE,
	// 	defaultValue: Sequelize.DataTypes.NOW
	// },
	// created_by: {
	// 	type: Sequelize.DataTypes.STRING,
	// 	defaultValue: 'Default',
	// },
	// updated_by: {
	// 	type: Sequelize.DataTypes.STRING,
	// 	defaultValue: 'Default'
	// }
};

let Model = ModelSequelize.get('${name}', ModelSchema, {
	// toObject : function () {
	// 	let ret = this.dataValues;
	// 	delete ret.hash;
	// 	delete ret.salt;
	//
	// 	return ret;
	// },
	// isPassword : function(password) {
	// 	return comparePass(password, this.hash, this.salt);
	// }
});

module.exports = {
	Model,
	create: async data => {

		let instance = new Model(data);

		await instance.save();

		return instance;
	},
	getAll: (query = {}) => Model.findAll({where: query}),
	getOne: (query = {}) => Model.findOne({where: query}),
	updateAll: (changes, query = {}) => Model.update(changes, {where : query}),
	updateOne: (changes, query = {}) => Model.update(changes, {where : query, limit: 1}),
	clear: (query = {}) => Model.remove({where: query}),
	getByPage : async (page = 0, pageSize = 100, query = {}) => {
		const countTotal = await Model.count({where: query});
		const countPages = Math.ceil(countTotal / pageSize);
		const docs = await Model.findAll({
			offset : pageSize * page,
			limit  : pageSize,
			where  : query,
			//TODO : maybe not need
			attributes: { exclude: ['hash', 'salt'] },
			order: [['_id', 'DESC']]
		});

		return {
			countTotal,
			countPages,
			pageSize,
			currentPage : page,
			docs
		};
	},
	getById : (id) => Model.findById(id),
	count : (query = {}) => Model.count({where : query}),
};
`;
		break;
}

writter(`${__dirname}/../models/${drive}/${name}.js`, template).then(
	() => {
		log.success('Success generate model.');
		process.exit();
	},
	e => {
		log.error('Error generate model', e);
		process.exit();
	}
);
