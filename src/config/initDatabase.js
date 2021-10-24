const mongoose = require('mongoose');

exports.initDatabase = (connectionString) => {
    return mongoose.connect(connectionString);
}