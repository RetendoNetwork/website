const { Router } = require('express');
const router = new Router();

router.get('/updates', async (req, res) => {
	res.render('updates');
});

module.exports = router;