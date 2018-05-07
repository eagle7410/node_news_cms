// Libs
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;

let ModelSchema = new Schema({
	subscribe : {
		type : String,
		required : true,
	},
	title : {
		type : String,
		required : true,
	},
	data : {
		type : String,
		required : true,
	},
	type : {
		type : String,
		default : 'Default',
	},
	created_by : {
		type : String,
		required : true,
	},
	created_at : {
		type : Date,
		default : Date.now,
	},
	read_at : Date,
});

let Model = mongoose.model('notifications', ModelSchema);

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
};
