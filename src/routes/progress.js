const { Router } = require('express');
const router = new Router();

router.get('/progress', async (req, res) => {
    res.render('progress', {
        layout: false
    });
});

module.exports = router;