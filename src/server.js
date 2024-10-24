const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const database = require('./database');
const logger = require('./logger');
const utils = require('./utils');
const config = require('../website-config.json');
const { config: { port } } = config;

const app = express();

const routes = {
    account: require('./routes/account'),
    home: require('./routes/home'),
    progress: require('./routes/progress')
};

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '..', 'views'));

logger.info(`Applying routes.`);
app.use(routes.account);
app.use(routes.home);
app.use(routes.progress);

app.use((req, res) => {
    const fullUrl = utils.fullUrl(req);
    res.render('404', {
        layout: false
    });
});

logger.info('Starting server.');
database.connect().then(() => {
    app.listen(port, () => {
        logger.log(`Server listening on http://localhost:${port}`);
    });
});