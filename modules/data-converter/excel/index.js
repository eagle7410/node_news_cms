const json2xls = require('json2xls');
const fs = require('fs');
const {promisify} = require('util');
const writter     = promisify(fs.writeFile);
const transforms = require('./transforms');

class Drive {
	async toFile (data, filePath) {
		const xls = json2xls(data);

		await writter(filePath, xls, 'binary');

		return true;
	}

	async toResponse (res, content, tempalte) {
		const xls = json2xls(content);
		res.set({'Content-Type': 'application/ms-excel; charset=UTF-8' });
		res.set({'Content-Disposition': `attachment; filename="${tempalte}-${Date.now()}.xlsx`});

		res.status(200).send(new Buffer(xls, 'binary'));
	}
}

class PdfConverter {
	constructor () {
		this.drive = new Drive();
	}

	_getContent (data, tempalte) {
		return transforms[tempalte](data);
	}

	async toFile(data, fileName, tempalte) {
		let content = this._getContent(data, tempalte);

		return await this.drive.toFile(content, fileName);
	}

	async toResponse(res, data, tempalte) {
		let content = this._getContent(data, tempalte);

		return await this.drive.toResponse(res, content, tempalte);
	}
}

module.exports = PdfConverter;
