const { TOKEN_CONNECTION_NAME, SECRET } = require('./../constants.js');
const { jwtVerify } = require('./../utils/jwtSign.js');

const auth = (req, res, next) => {
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
};

const isAuth = (req, res, next) => {
    let user = req.user;
    if(user) {
        req.isAuth = true;
    } else {
        req.isAuth = false;
    }
    next();
};

let authMiddleware = {
    auth,
    isAuth,
}

module.exports = authMiddleware;