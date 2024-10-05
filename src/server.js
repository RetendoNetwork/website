const config = require('../config.json');
const { config: { port } } = config;
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

const home = require('./routes/home');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(home);

app.listen(port, () => {
    console.log(`The server was started on http://localhost:${port}`);
});