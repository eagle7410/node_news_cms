const Controller = require('../../classes/ControllerClient');
const truncate = require('truncate-html');

const DateCustom = require('../../classes/DateCustom');
const ErrorHttp  = require('../../classes/ErrorHttp');
const Model   = require('../../models/mongo/news');
const PAGE_SIZE = 12;
const COUNT_WORDS_IN_HTML = 30;

class News extends Controller {
	static async get_detail(req, res) {
		const id = req.query.id;
		const lang = res.locals.getLocale();


		if (!id) {
			throw ErrorHttp.badRequest();
		}

		let news = await Model.getOne({_id : id},  this.selectFormNews(lang, false));

		if (!news) {
			throw ErrorHttp.notFound();
		}

		this.render(req, res, 'detail',{
			_id : news._id,
			author : news.author,
			publish_at : new DateCustom(news.publish_at).toStringByFormat(),
			title : news.title[lang],
			text  : news.text[lang],
			comments : news.comments
		});
	}
	static selectFormNews (lang, isList = true) {
		let select = {
			publish_at : 1,
			author : 1,
			_id : 1,
		};

		if (!isList) {

			select = {
				...select,
				comments : true
			}
		}

		select['title.' + lang] = 1;
		select['text.' + lang] = 1;



		return select;
	}

	static async get_show(req, res) {
		let page = req.query.page || 0;
		const lang = res.locals.getLocale();

		let data = await Model.getByPage(page, PAGE_SIZE, this.selectFormNews(lang), {
			is_active : true,
			publish_at : { $lte : new Date() }
		});

		data.news = data.docs.map(news => {
			return {
				_id : news._id,
				author : news.author,
				publish_at : new DateCustom(news.publish_at).toStringByFormat(),
				title : news.title[lang],
				text  : truncate(news.text[lang], COUNT_WORDS_IN_HTML, {byWords: true,  stripTags: true}),
			};
		});

		this.render(req, res, 'show', data);
	}
}

module.exports = News;
