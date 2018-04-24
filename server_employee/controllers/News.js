const Controller = require('../../classes/ControllerEmployee');

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
			post_news : [
				groups.admin,
				groups.moderator,
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
}

module.exports = News;
