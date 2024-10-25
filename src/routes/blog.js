const { Router } = require('express');
const router = new Router();

router.get('/blog', async (req, res) => {
    res.render('blog/blog');
});

module.exports = router;