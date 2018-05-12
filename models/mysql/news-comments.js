// Libs
const Sequelize = require('sequelize');
const ModelSequelize = require('../../classes/ModelSequelize');

let ModelSchema = {
	_id: {
		type: Sequelize.DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	news_id: {
		type: Sequelize.DataTypes.INTEGER,
		allowNull: false,
	},
	text: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	lang: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	created_at: {
		type: Sequelize.DataTypes.DATE,
		defaultValue: Sequelize.DataTypes.NOW
	},
	created_by: {
		type: Sequelize.DataTypes.STRING,
		defaultValue: 'Default',
	},

};

let Model = ModelSequelize.get('news-comments', ModelSchema);

module.exports = {
	Model,
	create: async data => {

		let instance = new Model(data);

		await instance.save();

		return instance;
	},
	getAll: (query = {}) => Model.findAll({where: query, order: [['_id', 'DESC']]}),
	getOne: (query = {}) => Model.findOne({where: query}),
	updateAll: (changes, query = {}) => Model.update(changes, {where : query}),
	updateOne: (changes, query = {}) => Model.update(changes, {where : query, limit: 1}),
	clear: (query = {}) => Model.remove({where: query}),
	getByPage : async (page = 0, pageSize = 100, query = {}) => {
		const countTotal = await Model.count({where: query});
		const countPages = Math.ceil(countTotal / pageSize);
		const docs = await Model.findAll({
			offset : pageSize * page,
			limit  : pageSize,
			where  : query,
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
	count : (query = {}) => Model.count({where : query}),
};
