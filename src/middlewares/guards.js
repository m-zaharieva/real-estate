const isAuth = (req, res, next) => {
    let user = req.user;
    if(user) {
        req.isAuth = true;
    } else {
        req.isAuth = false;
    }
    next();
};
