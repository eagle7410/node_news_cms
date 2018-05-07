// Libs
let mongoose    = require('mongoose');
let DateCustom  = require('../../classes/DateCustom');
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
		query = {},
		sort = { _id :-1}
	) => {
		const countTotal = await Model.count(query);
		const countPages = Math.ceil(countTotal / pageSize);

		const docs = await Model.find(query)
			.select(select)
			.skip(pageSize * page)
			.limit(pageSize)
			.sort(sort);

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
	getOne : (query = {}, select = {}) => Model.findOne(query).select(select),
	getById : (id) => Model.findById(id),
	exists : async (query = {}) => {
		const count = await Model.count(query);
		return !!count;
	},
	existsId : (id) => module.exports.exists({_id: id}),
	clear  : (query = {}) => Model.remove(query),
	getListForEmployee : () => Model.find({}).select({
		text      : 0,
		comments  : 0
	}).sort({_id : -1}),
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

		return await module.exports.updateOne(data, {_id : id});

	},
	count : (query = {}) => Model.count(query),
	statsByWeekAgo: async () => {
		let oneWeekAgo = new DateCustom();
		oneWeekAgo.setHours(0,0,0,0);
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

		let data = await Model.aggregate(
			[
				{ $match: {created_at : {$gte : oneWeekAgo}}},
				{ $project : { day : {$substr: ["$created_at", 0, 10] }}},
				{ $group   : { _id : "$day",  number : { $sum : 1 }}},
				{ $sort    : { _id : 1 }}
			]
		);

		let stats = {};

		for (let stat of data) {
			stats[stat._id] = Number(stat.number);
		}

		return {
			dateRun :  oneWeekAgo.toStringByFormat('y/m/d'),
			stats
		};
	}
};
