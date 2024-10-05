const { Router } = require('express');
const router = new Router();

router.get('/', async (req, res) => {
    res.render('home', {
        layout: false
    });
});

module.exports = router;