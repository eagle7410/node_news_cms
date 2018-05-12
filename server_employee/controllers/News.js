const drive = process.drive;
const Controller = require('../../classes/ControllerEmployee');
const ErrorHttp  = require('../../classes/ErrorHttp');

const groups = require('../../constants/groups');
const ModelNews   = require('../../models/'+drive+'/news');
const DataConverter   = require('../../modules/data-converter');

class News extends Controller {
	static groups () {
		return {
			get_news : [
				groups.admin,
				groups.moderator,
				groups.content
			],
			post_save : [
				groups.admin,
				groups.moderator,
			],
			post_change_active : [
				groups.admin,
				groups.moderator
			],
			get_one_news : [
				groups.admin,
				groups.content
			],
			get_news_to_pdf : [
				groups.admin
			],
			get_news_to_excel : [
				groups.admin
			]
		}
	};

	static async get_news_to_pdf (req, res) {
		let news = await ModelNews.getListForEmployee();
		let converter = new DataConverter({news});

		converter.toResponse(res, DataConverter.typePdf(), 'news');
	}

	static async get_news_to_excel (req, res) {
		let news = await ModelNews.getListForEmployee();
		let converter = new DataConverter(news);

		converter.toResponse(res, DataConverter.typeExcel(), 'news');
	}

	static async get_one_news (req, res) {
		let news = await ModelNews.getById(req.decode.id);
		if (!news) {
			throw ErrorHttp.notFound();
		}

		res.jwt({news});
	}

	static async get_news (req, res) {

		if (req.decode.page !== undefined && req.decode.pageSize) {
			let data = await ModelNews.getByPage(req.decode.page, req.decode.pageSize);
			return res.jwt(data);
		}

		let list = await ModelNews.getListForEmployee();
		res.jwt({list});
	}

	static async post_save (req, res) {
		await ModelNews.save(req.decode, req.tokenData.email);
		res.jwt({success : true});
	}

	static async post_set_active(req, res) {
		let data = req.decode;
		let news = await ModelNews.getById(data.id);

		if (!news) {
			throw ErrorHttp.notFound();
		}

		news.is_active = data.is_active;
		news.updated_at = new Date();
		news.updated_by = req.tokenData.email;

		await news.save();

		let send = news.toObject();

		delete send.comments;
		delete send.text;

		res.jwt({news: send});
	}
}

module.exports = News;
