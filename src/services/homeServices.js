const Housing = require('./../models/Housing.js');

exports.allHousings = () => {
    return Housing.find({}).lean();
}