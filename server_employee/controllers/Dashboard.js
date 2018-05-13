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

		const countClients = await Clients.count();
		const countNews    = await News.count();
		const chartClients = await Clients.statsByWeekAgo();
		const chartNews    = await News.statsByWeekAgo();

		res.jwt({
			countClients,
			countNews,
			chartClients,
			chartNews
		});
	}
}

module.exports = Dashboard;
