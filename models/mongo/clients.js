// Libs
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;

let {validatePass, createPass, comparePass} = require('../../utils/password');
let DateCustom = require('../../classes/DateCustom');
let ModelSchema = new Schema({
	email: {
		type: String, match: /.+@.*\..*/,
		lowercase: true,
		required: true,
		unique: true,
		index: true
	},
	hash: {
		type: String,
		required: true,
		strict: true
	},
	salt: {
		type: String
	},
	name: {
		type: String,
		default: ''
	},
	surname: {
		type: String,
		default: ''
	},
	groups: {
		type: Array,
		required: true,
		default: ['client'],
	},
	is_active: {type: Boolean, default: false},
	is_deleted: {type: Boolean, default: false},
	confirm_at : Date,
	confirm_by : String,
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
}, {
	toObject: {
		transform : (doc, ret) => {
			delete ret.hash;
			delete ret.salt;
			delete ret.__v;

			return ret;
		}
	}
});

ModelSchema
	.virtual('password')
	.set(function (pass) {
		if (!validatePass(pass)) {
			throw `Invalid password: ${pass}`;
		}

		let {hash, salt} = createPass(pass);

		this.hash = hash;
		this.salt = salt;
	})
	.get(function () {
		return this.hash;
	});

ModelSchema.methods = {
	...ModelSchema.methods,
	isPassword : function(password) {
		return comparePass(password, this.hash, this.salt);
	}
};

let Model = mongoose.model('clients', ModelSchema);

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
			.select({hash : 0, salt: 0})
			.sort({_id : -1})
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
	clear  : (query = {}) => Model.remove(query),
	save : async (data, user) => {
		const date = new Date();
		const id   = data._id;

		let save = {
			email      : data.email,
			name       : data.name,
			surname    : data.surname,
			updated_by : user,
			updated_at : date
		};

		if (!id) {
			return await module.exports.create({
				...save,
				password   : data.password,
				created_by : user,
				created_at : date
			});
		}

		return await module.exports.updateOne(save, {_id : id});

	},
	getByEmailAndCheck: async (email, pass) => {
		let user = await Model.findOne({
			email,
			is_active: true,
			is_deleted: false
		});

		if (!user) return false;

		return user.isPassword(pass) ? user : false;
	},
	toJwt: ({email, name, surname, groups}) => ({email, name, surname, groups}),
	countByEmail : (email) => Model.count({email}),
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
