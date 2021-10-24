const Housing = require('./../models/Housing.js');


exports.create = (housing, ownerId) => {
    
    let { name, type, year, city, homeImage, description, availablePieces } = housing;

    return Housing.create({ name, type, year, city, homeImage, description, availablePieces, ownerId });
}