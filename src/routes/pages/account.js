const { Router } = require('express');
const router = new Router();

router.get('/account/login', async (req, res) => {
    res.render('account/login', {
        layout: false
    });
});

router.get('/account/register', async (req, res) => {
    res.render('account/register', {
        layout: false
    });
});

module.exports = router;