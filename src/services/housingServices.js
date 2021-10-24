const Housing = require('./../models/Housing.js');


exports.create = (housing, ownerId) => {

    let { name, type, year, city, homeImage, description, availablePieces } = housing;

    return Housing.create({ name, type, year, city, homeImage, description, availablePieces, ownerId });
};


exports.getOne = (houseId) => {
    return Housing.findById(houseId).populate('rented').lean();
};

exports.getAll = () => {
    return Housing.find({}).populate().lean();
};

exports.update = (houseId, house) => {
    return Housing.findByIdAndUpdate({ _id: houseId }, { ...house });
};

exports.deleteOne = (houseId) => {
    return Housing.findByIdAndDelete({ _id: houseId });
};

exports.rent = (houseId, user) => {
    return Housing.findById({ _id: houseId })
        .then(house => {
            house.rented.push(user._id);
            house.availablePieces -= 1;
            house.save();
            return house;
        });
};