const Estate = require('../models/Estate.js');


const create = (housing, ownerId) => {
    let { name, type, year, city, homeImage, description, availablePieces } = housing;
    return Estate.create({ name, type, year, city, homeImage, description, availablePieces, ownerId });
};

const getTopHouses = () => {
    return Estate.find().sort({ createdAt: -1 }).limit(3).lean();
}

const getOne = (houseId) => {
    return Estate.findById(houseId).populate('rented').lean();
};

const getAll = () => {
    return Estate.find({}).populate().lean();
};

const update = (houseId, house) => {
    // return Estate.findByIdAndUpdate({ _id: houseId }, { $set: { ...house } }, { runValidators: true });
    return Estate.findByIdAndUpdate({ _id: houseId }, { ...house });
    //TODO Run validation on update and catch them
};

const deleteOne = (houseId) => {
    return Estate.findByIdAndDelete({ _id: houseId });
};

const rent = (houseId, user) => {
    return Estate.findById({ _id: houseId })
        .then(house => {
            house.rented.push(user._id);
            house.availablePieces -= 1;
            house.save();
            return house;
        });
};


let estateServices = {
    create,
    getTopHouses,
    getOne,
    getAll,
    update,
    deleteOne,
    rent,
};

module.exports = estateServices;
