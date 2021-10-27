const bcrypt = require('bcrypt');

const User = require('./../models/User.js');
const { jwtSign } = require('./../utils/jwtSign.js');
const { SECRET, TOKEN_CONNECTION_NAME } = require('./../constants.js');



const register = (name, username, password) => {
    return User.create({ name, username, password });
};

const login = (username, password) => {
    return findOne(username)
        .then(user => {
            let isValid = bcrypt.compare(password, user.password);
            return Promise.all([isValid, user]);
        })
        .then(([isValid, user]) => {
            if (isValid) {
                return user;
            }
        })
        .catch(err => {
            return null;
        });
}

const createToken = (user) => {
    let payload = {
        _id: user._id,
        username: user.username,
    }

    return jwtSign(payload, SECRET)
        .then(token => {
            return token;
        })
        .catch(error => {
            console.log(error.message)
        });
};

const setCookie = (res, token) => {
    res.cookie(TOKEN_CONNECTION_NAME, token, {
        httpOnly: true,
    });
}

const findOne = (username) => {
    return User.findOne({ username }).lean();
}


let authServices = {
    register,
    login,
    createToken,
    findOne,
    setCookie,
};

module.exports = authServices;

