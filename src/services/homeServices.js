const Estate = require('./../models/Estate.js');

const search = (houseType) => {
    let pattern = new RegExp(`^${houseType.type}`, 'i' );
    return Estate.find({type: pattern}).lean();
}


homeServices = {
    search,
};

module.exports = homeServices;