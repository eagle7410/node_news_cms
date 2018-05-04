// Libs
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;

let ModelSchema = new Schema({
	news_id : {
		type : String,
		required : true,
		index : true
	},
	text : {
		type : String,
		required : true,
	},
	lang : {
		type : String,
		required : true,
	},
	created_by : {
		type : String,
		required : true,
	},
	created_at : {
		type : Date,
		default : Date.now,
	}
});

let Model = mongoose.model('news-comments', ModelSchema);

module.exports = {
	create : data => new Promise((ok, bad) => {

		let instance = new Model(data);

		instance.save(err => {
			if (err) return bad(err);
			ok(instance);
		});
	}),
	getById : (id) => Model.findById(id),
	getAll : (query = {}, sort = {created_at : -1}) => Model.find(query).sort(sort),
	updateAll: (changes, query = {}) => Model.update(query, {$set: changes}, {multi: true}),
	updateOne: (changes, query = {}) => Model.update(query, {$set: changes}),
	clear  : (query = {}) => Model.remove(query)
};
