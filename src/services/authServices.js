const User = require('./../models/User.js');
const { jwtSign } = require('./../utils/jwtSign.js');
const { SECRET } = require('./../constants.js');



exports.register = (name, username, password) => {
    return User.create({name, username, password});  
};

exports.createToken = (user) => {
    let payload = {
        _id: user._id,
        username: user.username,
        name: user.name,
    }

    return jwtSign(payload, SECRET)
        .then(token => {
            return token;
        });
}

