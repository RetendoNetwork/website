const got = require('got');
const logger = require('./logger');
const express = require('express');
const config = require('../website-config.json');

function fullUrl(req) {
    return `${req.protocol}://${req.hostname}${req.originalUrl}`;
}

function apiPostRequest(path, headers, json) {
    return got.post(`${config.api_base}${path}`, {
        responseType: 'json',
        throwHttpErrors: false,
        https: {
            rejectUnauthorized: false,
        },
        headers,
        json
    });
}

function apiDeleteRequest(path, headers, json) {
    return got.delete(`${config.api_base}${path}`, {
        throwHttpErrors: false,
        https: {
            rejectUnauthorized: false,
        },
        headers,
        json
    });
}

async function register(registerData) {
    const apiResponse = await apiPostRequest('/v1/register', {}, registerData);

    if (apiResponse.statusCode !== 200) {
        throw new Error(apiResponse.body.error);
    }

    return apiResponse.body;
}

async function login(username, password) {
    const apiResponse = await apiPostRequest('/v1/login', {}, {
        username,
        password,
        grant_type: 'password'
    });

    if (apiResponse.statusCode !== 200) {
        throw new Error(apiResponse.body.error);
    }

    return apiResponse.body;
}

module.exports = {
    fullUrl,
    apiPostRequest,
    apiDeleteRequest,
    register,
    login
}