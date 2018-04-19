// Libs
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;

let {validatePass, createPass, comparePass} = require('../../utils/password');
let {employee} = require('../../constants/groups');

let ModelSchema = new Schema({
	email      : {
		type: String, match: /.+@.*\..*/,
		required : true,
		unique   : true,
		index    : true
	},
	hash: {
		type: String,
		required : true,
		strict   : true
	},
	salt: {
		type : String
	},
	name : {
		type : String,
		default : ''
	},
	surname : {
		type : String,
		default : ''
	},
	groups: {
		type: Array,
		required: true,
		default: [employee],
	},
	is_active  : {type: Boolean, default: true},
	is_deleted : {type: Boolean, default: false},
	created_at : {
		type : Date,
		default : Date.now,
	},
	updated_at : {
		type : Date,
		default : Date.now
	}
});

ModelSchema
	.virtual('password')
	.set (function(pass) {

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

let Model = mongoose.model('employees', ModelSchema);


module.exports = {
	create : data => new Promise((ok, bad) => {

		let instance = new Model(data);

		instance.save(err => {
			if (err) return bad(err);
			ok(instance);
		});
	}),
	getAll : (query = {}) => Model.find(query),
	getOne : (query = {}) => Model.findOne(query),
	clear  : (query = {}) => Model.remove(query)
};
