const wkhtmltopdf = require('wkhtmltopdf');
const ejs = require('ejs');
const {promisify} = require('util');

class Drive {
	toFile (content, filePath) {
		return new Promise((ok,bad)=> {
			try {

				let stream = wkhtmltopdf(content, { output: filePath });
				stream.on('end', ok);

			} catch (e) {
				bad(e);
			}
		});
	}

	async toResponse (res, content) {
		wkhtmltopdf(content).pipe(res);
	}
}

class PdfConverter {
	constructor () {
		this.drive = new Drive();
		this.rendering = promisify(ejs.renderFile);
	}

	async toFile(data, fileName, template) {
		const content = await this._getContent(data, template);

		return await this.drive.toFile(content, fileName);
	}

	async toResponse(res, data, template) {
		const content = await this._getContent(data, template);

		return await this.drive.toResponse(res, content);
	}

	async _getContent(data, template) {
		return await this.rendering(`${__dirname}/templates/${template}.ejs`, {
			...data,
			appName : process.appName
		});
	}
}

module.exports = PdfConverter;
