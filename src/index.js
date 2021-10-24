const express = require('express');
const { initHandlebars } = require('./config/expressHandlebars.js');
const { initDatabase } = require('./config/initDatabase.js');
const path = require('path');

// Local Modules
const config = require('./config/config.json')[process.env.NODE_ENV];
const router = require('./routes.js');


// Init ExporessJS
const app = express();
// Init handlebars
initHandlebars(app);
// Static files 
app.use(express.static(path.resolve(__dirname, './static')));
// Routes
app.use(router);



// Init Database and app port listening
initDatabase(config.DB_CONNECTION_STRING)
    .then(() => {
        app.listen(config.PORT, () => {
            console.log(`App is running on http://localhost:${config.PORT} ...`);
    });

});