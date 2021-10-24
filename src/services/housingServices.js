const Housing = require('./../models/Housing.js');


exports.create = (housing, ownerId) => {
    
    let { name, type, year, city, homeImage, description, availablePieces } = housing;

    return Housing.create({ name, type, year, city, homeImage, description, availablePieces, ownerId });
};


exports.getOne = (houseId) => {
    return Housing.findById(houseId).populate().lean();
};

exports.getAll = () => {
    return Housing.find({}).populate().lean();
}