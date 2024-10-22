const { Router } = require('express');
const router = new Router();

router.get('/account/login', async (req, res) => {
    res.render('account/login', {
        layout: false
    });
});

router.post('account/login', async (req, res) => {

});

router.get('/account/register', async (req, res) => {
    res.render('account/register', {
        layout: false
    });
});

router.post('account/register', async (req, res) => {

});

module.exports = router;