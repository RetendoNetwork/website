const express = require('express');
const exphbs = require('express-handlebars');
const config = require('../config.json');
const logger = require('./logger');
const { config: { port } } = config;
const { config: { url } } = config;
const path = require('path');

const server = express();

const routes = {
    account: require('./routes/account'),
    home: require('./routes/home'),
    progress: require('./routes/progress')
};

server.use(express.static(path.join(__dirname, '..', 'public')));

server.engine('handlebars', exphbs.engine());
server.set('view engine', 'handlebars');
server.set('views', path.join(__dirname, '..', 'views'));

logger.info(`Applying routes.`);
server.use(routes.account);
server.use(routes.home);
server.use(routes.progress);

server.listen(port, () => {
    logger.log(`The server was started on https://${url}:${port}`);
});