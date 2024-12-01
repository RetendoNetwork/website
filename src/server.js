const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./database');
const logger = require('./logger');
const utils = require('./utils');
const config = require('../config.json');
const { config: { port } } = config;
const app = express();

app.use(morgan('dev'));
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));
app.use(express.urlencoded({
	extended: true
}));
app.use(cookieParser());

app.engine('handlebars', handlebars({
    layoutsDir: './views/layouts',
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', './views'); 

app.use(express.static('public'));

const routes = {
    account: require('./routes/account'),
    blog: require('./routes/blog'),
    home: require('./routes/home'),
    progress: require('./routes/progress'),
    updates: require('./routes/updates')
};

app.use(routes.account);
app.use(routes.blog);
app.use(routes.home);
app.use(routes.progress);
app.use(routes.updates);

app.use((req, res) => {
	const fullUrl = utils.fullUrl(req);
	res.render('404');
});

app.listen(port, async () => {
    connectDB();
	logger.log(`The server was listening on http://localhost:${port}`);
});