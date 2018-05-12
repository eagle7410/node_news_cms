// Libs
const Sequelize = require('sequelize');
const ModelSequelize = require('../../classes/ModelSequelize');
const DateCustom = require('../../classes/DateCustom');

let ModelSchema = {
	_id: {
		type: Sequelize.DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	title_en: {
		type: Sequelize.DataTypes.STRING,
		defaultValue: ''
	},
	title_ru: {
		type: Sequelize.DataTypes.STRING,
		defaultValue: ''
	},
	title: {
		type: Sequelize.DataTypes.VIRTUAL,
		set : function (title) {

			this.title_en = title.en;
			this.title_ru = title.ru;
		},
		get : function () {
			return {
				en : this.title_en,
				ru : this.title_ru
			};
		}
	},
	text_ru: {
		type: Sequelize.DataTypes.STRING,
		defaultValue: ''
	},
	text_en: {
		type: Sequelize.DataTypes.STRING,
		defaultValue: ''
	},
	text: {
		type: Sequelize.DataTypes.VIRTUAL,
		set : function (text) {

			this.text_en = text.en;
			this.text_ru = text.ru;
		},
		get : function () {
			return {
				en : this.text_en,
				ru : this.text_ru
			};
		}
	},
	publish_at : {
		type: Sequelize.DataTypes.DATE,
		defaultValue: Sequelize.DataTypes.NOW
	},
	author: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	is_active : {type: Sequelize.DataTypes.BOOLEAN, defaultValue: true},
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

let Model = ModelSequelize.get('news', ModelSchema);
const queryBuild = query => {
	let q = {}

	for ([prop, val] of Object.entries(query))
		q[prop.replace(/\./g,'_')] = val;

	return q;
};

module.exports = {
	Model,
	create: async data => {

		let instance = new Model(data);

		await instance.save();

		return instance;
	},
	getAll: (query = {}) => Model.findAll({where: queryBuild(query)}),
	getOne: (query = {}) => Model.findOne({where: queryBuild(query)}),
	updateAll: (changes, query = {}) => Model.update(changes, {where : queryBuild(query)}),
	updateOne: (changes, query = {}) => Model.update(changes, {where : queryBuild(query), limit: 1}),
	clear: (query = {}) => Model.remove({where: queryBuild(query)}),

	getByPage : async (
		page = 0,
		pageSize = 100,
		select = {text : 0},
		query = {},
	) => {
		let attributes = {};

		if (select.text === 0) {
			attributes= { exclude: ['text', 'text_ru', 'text_en'] };
		}

		const countTotal = await Model.count({where: queryBuild(query)});
		const countPages = Math.ceil(countTotal / pageSize);
		const docs = await Model.findAll({
			offset : pageSize * page,
			limit  : pageSize,
			where  : queryBuild(query),
			order: [['_id', 'DESC']],
			attributes
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
	count : (query = {}) => Model.count({where : queryBuild(query)}),
	exists : async (query = {}) => {
		const count = await module.exports.count(query);
		return !!count;
	},
	existsId : (id) => module.exports.exists({_id: id}),
	getListForEmployee : () => Model.findAll({
		attributes: { exclude: ['text', 'text_ru', 'text_en'],  },
		order: [['_id', 'DESC']]
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

		return await module.exports.updateOne(data, {_id : id});

	},
	statsByWeekAgo: async () => {
		let oneWeekAgo = new DateCustom();
		oneWeekAgo.setHours(0,0,0,0);
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

		let data = await process.db.query(
			'SELECT DATE_FORMAT(created_at, "%Y-%m-%d") as day, COUNT(_id) as number ' +
			'FROM news ' +
			`WHERE created_at >= "${oneWeekAgo.toStringByFormat('y-m-d')}" `+
			'GROUP BY DATE_FORMAT(created_at, "%Y-%m-%d")',
			{type: process.db.QueryTypes.SELECT}
		);
		let stats = {};

		for (let stat of data) {
			stats[stat.day] = Number(stat.number);
		}

		return {
			dateRun :  oneWeekAgo.toStringByFormat('y/m/d'),
			stats
		};
	}
};
