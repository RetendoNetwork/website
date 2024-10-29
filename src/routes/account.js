const express = require('express');
const { Router } = require('express');
const router = new Router();
const RNID = require('../schema/rnid');
const bcrypt = require('bcrypt');
const editorJSON = require('./miieditor.json');
const utils = require('../utils');
const { resolve } = require('url');

router.get('/account', async (req, res) => {
    res.render('account/account');
});

router.get('/account/login', async (req, res) => {
	res.render('account/login');
});

router.post('/account/login', async (req, res) => {
	const { username, password } = req.body;

	const tokens = await utils.login(username, password);

	res.cookie('refresh_token', tokens.refresh_token, { domain: '.retendo.online' });
	res.cookie('access_token', tokens.access_token, { domain: '.retendo.online' });
	res.cookie('token_type', tokens.token_type, { domain: '.retendo.online' });

	res.redirect(req.redirect || '/account');
});

router.get('/account/register', async (req, res) => {
	const renderData = {
		email: req.cookies.email,
		username: req.cookies.username,
		mii_name: req.cookies.mii_name
	};

	res.clearCookie('email', { domain: '.retendo.online' });
	res.clearCookie('username', { domain: '.retendo.online' });
	res.clearCookie('mii_name', { domain: '.retendo.online' });

	res.render('account/register', renderData);
});

router.post('/account/register', async (req, res) => {
	const { email, username, mii_name, password, password_confirm, 'h-captcha-response': hCaptchaResponse } = req.body;

	res.cookie('email', email, { domain: '.retendo.online' });
	res.cookie('username', username, { domain: '.retendo.online' });
	res.cookie('mii_name', mii_name, { domain: '.retendo.online' });

	const tokens = await utils.register({
		email,
		username,
		mii_name,
		password,
		password_confirm,
		hCaptchaResponse
	});

	res.cookie('refresh_token', tokens.refresh_token, { domain: '.retendo.online' });
	res.cookie('access_token', tokens.access_token, { domain: '.retendo.online' });
	res.cookie('token_type', tokens.token_type, { domain: '.retendo.online' });

	res.clearCookie('email', { domain: '.retendo.online' });
	res.clearCookie('username', { domain: '.retendo.online' });
	res.clearCookie('mii_name', { domain: '.retendo.online' });

	res.redirect(req.redirect || '/account');
});

router.get('/account/logout', async (_req, res) => {
	res.clearCookie('refresh_token', { domain: '.retendo.online' });
	res.clearCookie('access_token', { domain: '.retendo.online' });
	res.clearCookie('token_type', { domain: '.retendo.online' });

	res.redirect('/');
});

router.get('/account/miieditor', async (req, res) => {
    const { account } = req;

    res.render('account/miieditor', {
        editorJSON
    });
});

module.exports = router;