const drive = process.drive;
const Controller = require('../../classes/ControllerEmployee');

const groups  = require('../../constants/groups');
const Clients = require('../../models/'+drive+'/clients');
const News    = require('../../models/'+drive+'/news');

class Dashboard extends Controller {
	static getMethodGroups () {
		return [
			groups.admin,
		];
	}

	static async get_init(req, res) {
		let today = new Date();

		today.setHours(0,0,0,0);

		const countClients      = await Clients.count();
		const countClientsToday = await Clients.count({created_at : {$gte : today}});
		const countNews         = await News.count();
		const countNewsToday    = await News.count({created_at : {$gte : today}});
		const chartClients      = await Clients.statsByWeekAgo();
		const chartNews         = await News.statsByWeekAgo();

		res.jwt({
			countClients,
			countClientsToday,
			countNews,
			countNewsToday,
			chartClients,
			chartNews
		});
	}
}

module.exports = Dashboard;
