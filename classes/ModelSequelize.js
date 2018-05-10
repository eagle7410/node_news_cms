
class ModelSequelize {
	static get(name, ModelSchema, customMethods = {}, options = {timestamps: false}) {
		let Model = process.db.define(name, ModelSchema, options);

		Model.prototype.toObject = function () {
			return Object.assign({}, this.dataValues);
		};

		for (let name in customMethods) {
			Model.prototype[name] = customMethods[name];
		}

		return Model;
	}
}

module.exports = ModelSequelize;
