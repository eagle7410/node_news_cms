// Libs
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;
let defText     =  {
	en : '',
	ru : ''
};

let ModelSchema = new Schema({
	title : {
		type : Object,
		default: defText
	},
	text : {
		type : Object,
		default : defText
	},
	author : {
		type : String,
		required : true,
	},
	publish_at : {
		type : Date,
		default : Date.now,
	},
	comments : {
		type : Array,
		default : []
	},
	created_by : {
		type : String,
		required : true,
	},
	created_at : {
		type : Date,
		default : Date.now,
	},
	updated_by : {
		type : String,
		required : true,
	},
	updated_at : {
		type : Date,
		default : Date.now
	},
	is_active : {
		type : Boolean,
		default : false
	}
});

let Model = mongoose.model('news', ModelSchema);

module.exports = {
	create : data => new Promise((ok, bad) => {

		let instance = new Model(data);

		instance.save(err => {
			if (err) return bad(err);
			ok(instance);
		});
	}),
	getByPage : async (
		page = 0,
		pageSize = 100,
		select = {text : 0, comments  : 0},
		query = {}) => {
		const countTotal = await Model.count(query);
		const countPages = Math.ceil(countTotal / pageSize);

		const docs = await Model.find(query)
			.select(select)
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
	updateAll: (changes, query = {}) => Model.update(query, {$set: changes}, {multi: true}),
	updateOne: (changes, query = {}) => Model.update(query, {$set: changes}),
	getAll : (query = {}) => Model.find(query),
	clear  : (query = {}) => Model.remove(query),
	getListForEmployee : () => Model.find({}).select({
		text      : 0,
		comments  : 0
	}),
	save : async (data, user) => {
		const date = new Date();
		const id   = data._id;

		data = {
			title      : data.title,
			text       : data.text,
			author     : data.author,
			publish_at : data.publish_at,
			updated_by : user,
			updated_at : date
		};

		if (!id) {
			return await module.exports.create({
				...data,
				created_by : user,
				created_at : date
			});
		}

		// TODO: Back need check
		return await module.exports.updateOne(data, {_id : id});

	}
};
