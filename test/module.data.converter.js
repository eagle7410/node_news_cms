const fs = require('fs');
const {promisify} = require('util');
const writter     = promisify(fs.writeFile);
const exists      = promisify(fs.exists);
const DataConverter = require('../modules/data-converter');
const testNews = require('./data/news');
const pathPdf = `${__dirname}/runtime/test-news.pdf`;
const pathXlsx = `${__dirname}/runtime/test-news.xlsx`;

process.appName = 'TEST APP';

describe('Test module data-converter', () => {

	before(async () => {
		if (fs.existsSync(pathPdf))
			fs.unlinkSync(pathPdf);

		return true;
	});

	it('Create json to pfd file', async () => {
		let converter = new DataConverter({news : testNews});

		await converter.toFile(DataConverter.typePdf(), pathPdf, 'news');

		let isExists = await exists(pathPdf);

		if (!isExists) {
			throw new Error('Not create pdf file');
		}

		return true;
	});

	it('Create json to xlsx file', async () => {
		let data = testNews.map(news => ({
			"Title english" : news.title.en,
			"Title russian" : news.title.ru,
			"Active"        : news.is_active,
			"Autor"         : news.author,
		}));

		let converter = new DataConverter(testNews);

		await converter.toFile(DataConverter.typeExcel(), pathXlsx, 'news');

		let isExists = await exists(pathXlsx);

		if (!isExists) {
			throw new Error('Not create xlsx file');
		}

		return true;
	});
});





