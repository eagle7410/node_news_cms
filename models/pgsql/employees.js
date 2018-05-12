// Libs
const Sequelize = require('sequelize');
const ModelSequelize = require('../../classes/ModelSequelize');

const {validatePass, createPass, comparePass} = require('../../utils/password');
const {employee} = require('../../constants/groups');
const ErrorModelValidation = require('../../classes/ErrorModelValidation');


let ModelSchema = {
	_id: {
		type: Sequelize.DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	email: {
		type: Sequelize.DataTypes.STRING,
		allowNull: true,
		set : function (val) {
			if (!/.+@.*\..*/.test(val)) {
				throw new ErrorModelValidation(`Field 'email' must be email ${val}`);
			}

			this.setDataValue('email', val.toLowerCase());
		},
		unique: true,
	},
	hash: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	salt: {
		type: Sequelize.DataTypes.STRING,
	},
	password: {
		type: Sequelize.DataTypes.VIRTUAL,
		set : function (pass) {

			if (!validatePass(pass)) {
				throw new ErrorModelValidation(`Invalid password: ${pass}`)
			}

			let {hash, salt} = createPass(pass);

			this.hash = hash;
			this.salt = salt;
		},
		get : function () {
			return this.hash;
		}
	},
	name: {
		type: Sequelize.DataTypes.STRING,
		defaultValue: ''
	},
	surname: {
		type: Sequelize.DataTypes.STRING,
		defaultValue: ''
	},
	groups_store : {
		type: Sequelize.DataTypes.STRING,
		defaultValue: 'employee',
	},
	groups: {
		type: Sequelize.DataTypes.VIRTUAL,
		defaultValue: ['employee'],
		set : function (val) {
			if (!Array.isArray(val)) {
				throw new ErrorModelValidation(`Field 'groups' must be array ${val}`);
			}

			this.groups_store = val.join(',');
		},
		get : function () {
			return this.groups_store.split(',')
		}
	},
	is_active : {type: Sequelize.DataTypes.BOOLEAN, defaultValue: true},
	is_deleted: {type: Sequelize.DataTypes.BOOLEAN, defaultValue: false},
	created_at: {
		type: Sequelize.DataTypes.DATE,
		defaultValue: Sequelize.DataTypes.NOW
	},
	updated_at: {
		type: Sequelize.DataTypes.DATE,
		defaultValue: Sequelize.DataTypes.NOW
	},
	created_by: {
		type: Sequelize.DataTypes.STRING,
		defaultValue: 'Default',
	},
	updated_by: {
		type: Sequelize.DataTypes.STRING,
		defaultValue: 'Default'
	}
};

let Model = ModelSequelize.get('employees', ModelSchema, {
	toObject : function () {
		let ret = {...this.dataValues};
		delete ret.hash;
		delete ret.groups_store;
		delete ret.salt;

		return {
			...ret,
			groups : this.groups
		};
	},
	isPassword : function(password) {
		return comparePass(password, this.hash, this.salt);
	}
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
	clear: (query = {}) => Model.destroy({where: query}),
	getByPage : async (page = 0, pageSize = 100, query = {}) => {
		const countTotal = await Model.count({where: query});
		const countPages = Math.ceil(countTotal / pageSize);
		const docs = await Model.findAll({
			offset : pageSize * page,
			limit  : pageSize,
			where  : query,
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
	getByEmailAndCheck: async (email, pass) => {
		let user = await Model.findOne({
			where: {
				email,
				is_active: true,
				is_deleted: false
			}
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
		            updated_at,
		            groups
	            }) => ({
		email,
		name,
		surname,
		created_at,
		updated_at,
		groups
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
