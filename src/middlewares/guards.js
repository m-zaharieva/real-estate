const isUser = (req, res, next) => {
    let user = req.user;
    if (user) {
        req.isUser = true;
        next();
    } else {
        req.isUser = false;
        res.redirect('/');
    }
};


const isGuest = (req, res, next) => {
    let user = req.user;
    if (!user) {
        req.isGuest = true,
        next();
    } else {
        req.isGuest = false;
        res.redirect('/');
    }
}



let guards = {
    isUser,
    isGuest,
}

module.exports = guards;