const express = require('express');
const hbs = require('express-handlebars').create({
    extname: '.hbs'
});
const port = 3000;

const homeController = require('./controllers/homePageController');
const aboutPageController = require('./controllers/aboutPageController');
const detailsPageController = require('./controllers/detailsPageController');
const createPageController = require('./controllers/createPageController');
const pageNotFoundController = require('./controllers/pageNotFoundController');

const app = express();

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

app.use(homeController);
app.use('/about', aboutPageController);
app.use('/details', detailsPageController);
app.use('/create', createPageController);
app.use('*/', pageNotFoundController);

app.listen(3000, () => console.log(`Server listening on port ${port}`));