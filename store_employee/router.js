const express = require('express');
const router = express.Router();

// define the about route
router.all('/about', (req, res) => {
	process.logger.error(req);
});

router.all('/:controller/:action', (req, res, next) => {
	res.send('About birds');
});

module.exports = router;
