const Controller = require('../../classes/ControllerEmployee');
const ErrorHttp  = require('../../classes/ErrorHttp');

const groups = require('../../constants/groups');
const ModelNews   = require('../../models/mongo/news');

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
			]
		}
	};

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

		res.jwt({news});
	}
}

module.exports = News;
