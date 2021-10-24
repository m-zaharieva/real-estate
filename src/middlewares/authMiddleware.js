const { TOKEN_CONNECTION_NAME, SECRET } = require('./../constants.js');
const { jwtVerify } = require('./../utils/jwtSign.js');

exports.auth = (req, res, next) => {
    let token = req.cookies[TOKEN_CONNECTION_NAME];
    if (!token) {
        return next();
    }

    jwtVerify(token, SECRET)
        .then(decodedToken => {
            res.locals.user = decodedToken;            
            req.user = decodedToken;
            next();
        })
        .catch(error => {
            console.log(error);
        });
}