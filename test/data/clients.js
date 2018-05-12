const DateCustom = require('../../classes/DateCustom');
let oneDayAgo = new DateCustom();
oneDayAgo.setHours(0,0,0,0);
oneDayAgo.setDate(oneDayAgo.getDate() - 1);

let twoDayAgo = new DateCustom();
twoDayAgo.setHours(0,0,0,0);
twoDayAgo.setDate(twoDayAgo.getDate() - 2);

const clients = [
	{
		name     : 'Igor',
		surname  : 'Stcherbina',
		groups   : ['admin'],
		password : 'test2Testing',
		email    : 'test@mail.com',
		created_at : oneDayAgo
	},
	{
		name     : 'test1',
		surname  : 'Stcherbina',
		groups   : ['admin'],
		password : 'test2Testing',
		email    : 'test1@mail.com',
		created_at : twoDayAgo
	},
	{
		name     : 'test2',
		surname  : 'Stcherbina',
		groups   : ['admin'],
		password : 'test3Testing',
		email    : 'test3@mail.com',
		created_at : twoDayAgo
	},
];

module.exports = {
	clients,
	oneDayAgo,
	twoDayAgo
}
