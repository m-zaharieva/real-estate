const express = require('express');
const { initHandlebars } = require('./config/expressHandlebars.js');
const { initDatabase } = require('./config/initDatabase.js');
const path = require('path');
const cookieParser = require('cookie-parser');

// Local Modules
const config = require('./config/config.json')[process.env.NODE_ENV];
const router = require('./routes.js');
const authMiddleware = require('./middlewares/authMiddleware.js');


// Init ExporessJS
const app = express();
// Parse cookie data to an object
app.use(cookieParser());
// Parse form data
app.use(express.urlencoded({extended: true}));
// Init handlebars
initHandlebars(app);
// Static files 
app.use(express.static(path.resolve(__dirname, './static')));
// Verrify user's token and save user data to the response locals
app.use(authMiddleware.auth);
// Routes
app.use(router);


// Init Database and app port listening
initDatabase(config.DB_CONNECTION_STRING)
    .then(() => {
        app.listen(config.PORT, () => {
            console.log(`App is running on http://localhost:${config.PORT} ...`);
    });

});