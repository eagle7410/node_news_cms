const pdf = 'pdf';
const excel = 'excel';

class DataConverter {
	static typePdf () {
		return pdf
	};
	static typeExcel () {
		return excel
	};

	/**
	 *
	 * @returns {{pdf: string, excel: string}}
	 */
	static types () {
		return {
			pdf,
			excel,
		}
	}

	/**
	 *
	 * @param {object}data
	 */
	constructor (data) {
		this.data = data;
	}

	_getConverter (type) {
		const types = DataConverter.types();

		if (!types[type]) {
			throw new Error(`Bad type ${type}`);
		}

		switch (type) {
			case types.pdf:
				return require('./pdf');

			case types.excel:
				return require('./excel');

			default:
				throw new Error(`Type ${type} not implement`);
		}
	}
	/**
	 *
	 * @param {string} type
	 * @param {string} template
	 * @param {string} fileDir
	 * @param {array}  attach
	 * @returns {Promise<*>}
	 */
	async toFile(type, fileDir, template, ...attach) {
		const converter = new (this._getConverter(type))();

		return await converter.toFile(this.data, fileDir, template, ...attach)
	}

	async toResponse(res, type, template, ...attach) {
		const converter = new (this._getConverter(type))();

		return await converter.toResponse(res, this.data, template, ...attach)
	}
}

module.exports = DataConverter;
