const bcrypt = require('bcrypt');

const User = require('./../models/User.js');
const { jwtSign } = require('./../utils/jwtSign.js');
const { SECRET } = require('./../constants.js');



exports.register = (name, username, password) => {
    return User.create({name, username, password});  
};

exports.login = (username, password) => {
    return findOne(username)
        .then(user => {
            let isValid = bcrypt.compare(password, user.password);
            return Promise.all([isValid, user]);
        })
        .then(([isValid, user]) => {
            console.log(user)
            if (isValid) {
                return user;
            }
        })
        .catch(err => {
            return null;
        });
}

exports.createToken = (user) => {
    let payload = {
        _id: user._id,
        username: user.username,
    }

    return jwtSign(payload, SECRET)
        .then(token => {
            return token;
        });
};

const findOne = (username) => {
    return User.findOne({username}).lean();
}


