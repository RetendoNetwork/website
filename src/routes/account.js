const express = require('express');
const { connect, getRNIDModel } = require('../database');
const { Router } = require('express');
const router = new Router();
const utils = require('../utils');
const bcrypt = require('bcrypt');
const { resolve } = require('path/posix');

router.get('/account', async (req, res) => {
    const { account } = req;
    const { rnid } = req;

    res.render('account', {
        layout: false
    });
    return;
});

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

router.post('/account/register', async (req, res) => {
    const { email, username, mii_name, password } = req.body;

    res.cookie('email', email, { domain: '.retendo.online' });
    res.cookie('username', username, { domain: '.retendo.online' });
    res.cookie('mii_name', mii_name, { domain: '.retendo.online' });

    const tokens = await utils.register({
        email,
        username,
        mii_name,
        password
    });

    res.cookie('refresh_token', tokens.refresh_token, { domain: '.retendo.online' });
    res.cookie('access_token', tokens.access_token, { domain: '.retendo.online' });
    res.cookie('token_type', tokens.token_type, { domain: '.retendo.online' });

    res.clearCookie('email', { domain: '.retendo.online' });
    res.clearCookie('username', { domain: '.retendo.online' });
    res.clearCookie('mii_name', { domain: '.retendo.online' });

    res.redirect(req.redirect || '/account');
});

module.exports = router;