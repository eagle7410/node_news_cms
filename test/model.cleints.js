process.isTest = true;
const assert = require('assert');

// Get config
const {drive} = require('../configs/database');

require(`../models/${drive}/connect`);
const Clients = require(`../models/${drive}/clients`);

//Test data
const dataTest = require('./data/clients');

describe('Test model clients', () => {
	before(async () => {
		await Clients.clear();

		for(let client of dataTest.clients)
			await Clients.create(client);
	});

	it('get All', async () => {
		let clients = await Clients.getAll();
		assert.equal(clients.length, 3);
	});

	it('get statsByWeekAgo', async () => {
		let result = await Clients.statsByWeekAgo();

		assert.equal(result.stats[dataTest.oneDayAgo.byUtc().toStringByFormat('y-m-d')], 1);
		assert.equal(result.stats[dataTest.twoDayAgo.byUtc().toStringByFormat('y-m-d')], 2);

	});
});
