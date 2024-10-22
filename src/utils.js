const logger = require('./logger');
const express = require('express');

function fullUrl(req) {
    return `${req.protocol}://${req.hostname}${req.originalUrl}`;
}

module.exports = {
    fullUrl
}