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
	clear  : (query = {}) => Model.remove(query)
};`;

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
