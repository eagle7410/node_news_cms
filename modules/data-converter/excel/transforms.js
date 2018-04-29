const news = (news) => news.map(n => ({
	"Title english" : n.title.en,
	"Title russian" : n.title.ru,
	"Active"        : n.is_active,
	"Autor"         : n.author,
	"Publish"       : new Date(n.publish_at),
	"Who updated"   : n.updated_by,
	"Date updated"  : new Date(n.updated_at),
	"Who create"    : n.created_by,
	"Date created"  : new Date(n.created_at),
}));

module.exports = {
	news,
};
