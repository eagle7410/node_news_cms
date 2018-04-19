
module.exports = (req, res, next) => {
	res.set('X-Powered-By', 'PHP/5.1.2-1+b1');
	next();
};
