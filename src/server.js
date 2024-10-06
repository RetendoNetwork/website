const express = require('express');
const exphbs = require('express-handlebars');
const config = require('../config.json');
const logger = require('./logger');
const { config: { port } } = config;
const path = require('path');

const server = express();

const account = require('./routes/account');
const home = require('./routes/home');
const progress = require('./routes/progress');

server.use(express.static(path.join(__dirname, '..', 'public')));

server.engine('handlebars', exphbs.engine());
server.set('view engine', 'handlebars');
server.set('views', path.join(__dirname, '..', 'views'));

server.use(account);
server.use(home);
server.use(progress);

server.listen(port, () => {
    logger.log(`The server was started on http://localhost:${port}`);
});