// Libs
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let {validatePass, createPass, comparePass} = require('../../utils/password');
let {employee} = require('../../constants/groups');

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
		default: ['employee'],
	},
	is_active: {type: Boolean, default: true},
	is_deleted: {type: Boolean, default: false},
	created_at: {
		type: Date,
		default: Date.now,
	},
	updated_at: {
		type: Date,
		default: Date.now
	},
	created_by: {
		type: String,
		default: 'Default',
	},
	updated_by: {
		type: String,
		default: 'Default'
	}
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

let Model = mongoose.model('employees', ModelSchema);


module.exports = {
	create: data => new Promise((ok, bad) => {

		let instance = new Model(data);

		instance.save(err => {
			if (err) return bad(err);
			ok(instance);
		});
	}),
	getAll: (query = {}) => Model.find(query),
	getOne: (query = {}) => Model.findOne(query),
	updateAll: (changes, query = {}) => Model.update(query, {$set: changes}, {multi: true}),
	updateOne: (changes, query = {}) => Model.update(query, {$set: changes}),
	clear: (query = {}) => Model.remove(query),
	getByPage : async (page = 0, pageSize = 100, query = {}) => {
		const countTotal = await Model.count(query);
		const countPages = Math.ceil(countTotal / pageSize);
		const docs = await Model.find(query)
			.skip(pageSize * page)
			.select({hash : 0, salt: 0, __v: 0})
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
	toProfile: ({
		            email,
		            name,
		            surname,
		            created_at,
		            updated_at
	            }) => ({
		email,
		name,
		surname,
		created_at,
		updated_at
	}),
	save : async (data, user) => {

		if (data instanceof Model) {
			data = data.toObject()
		}

		const date = new Date();
		const id   = data._id;

		let save = {
			email      : data.email,
			name       : data.name,
			surname    : data.surname,
			groups     : data.groups,
			updated_by : user,
			updated_at : date
		};

		if (data.is_active !== undefined) {
			save.is_active = data.is_active;
		}
		if (data.is_deleted !== undefined) {
			save.is_deleted = data.is_deleted;
		}

		if (!id) {
			return await module.exports.create({
				...save,
				password   : data.password,
				created_by : user,
				created_at : date
			});
		}

		return await module.exports.updateOne(save, {_id : id});

	}
};
