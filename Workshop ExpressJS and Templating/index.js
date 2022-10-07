const express = require('express');
const cookieParser = require('cookie-parser');
const initDatabase = require('./config/database');
const authMiddleware = require('./middleware/authMiddleware');
const routes = require('./routes');
const app = express();
const PORT = 3000;

require('./config/handlebars')(app);
app.use(express.urlencoded({extended: true}));

app.use('/static', express.static('static'));
app.use(cookieParser());
app.use(authMiddleware);
app.use(routes);

//Set database and run server
initDatabase()
    .then(() => {
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    })
    .catch(err => {
        console.log(`Application init failed: ${err}`);
    })