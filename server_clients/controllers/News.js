const Controller = require('../../classes/ControllerClient');
const truncate = require('truncate-html');

// TODO: clear
const DateCustom = require('../../classes/DateCustom');
//const ErrorHttp  = require('../../classes/ErrorHttp');
//const groups = require('../../constants/groups');
const Model   = require('../../models/mongo/news');
const PAGE_SIZE = 18;
const COUNT_WORDS_IN_HTML = 30;

class News extends Controller {
	// TODO: clear
	// static groups () {
	// 	return {
	//		get_users : [
	//			groups.admin
	//		]
	//	}
	// };

	static async get_show(req, res) {
		let page = 0;
		let lang = res.locals.getLocale();
		let select = {
			publish_at : 1,
			author : 1,
			_id : 1,
		};

		select['title.' + lang] = 1;
		select['text.' + lang] = 1;

		let data = await Model.getByPage(page, PAGE_SIZE, select, {
			is_active : true,
			publish_at : { $lte : new Date() }
		});

		data.news = data.docs.map(news => {
			return {
				_id : news._id,
				author : news.author,
				publish_at : new DateCustom(news.publish_at).toStringByFormat(),
				title : news.title[lang],
				text  : truncate(news.text[lang], COUNT_WORDS_IN_HTML, {byWords: true}),
			};
		});

		this.render(req, res, 'show', data);
	}
}

module.exports = News;
