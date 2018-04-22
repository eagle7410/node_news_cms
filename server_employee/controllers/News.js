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
			]
		}
	};

	static async get_news (req, res) {
		let list = await ModelNews.getListForEmployee();
		res.jwt({list});
	}
}

module.exports = News;
