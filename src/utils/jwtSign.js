const jwt = require('jsonwebtoken');

exports.jwtSign = function (payload, secret) {
    let promise = new Promise((resolve, reject) => {
        jwt.sign(payload, secret, function(err, token) {
            if (err) {
                reject(err)
            } else {
                resolve(token)
            }
        });
    });

    return promise;
}

exports.jwtVerify = function(token, secret) {
    let promise = new Promise((resolve, reject) => {
        jwt.verify(token, secret, function(err, decodedToken) {
            if(err) {
                reject(err);
            } else {
                resolve(decodedToken);
            }
        });
    });

    return promise;
}