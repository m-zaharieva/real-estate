exports.errorHandler = (error, req, res, next) => {
    if (error) {
        res.locals.error = [error];
        res.status(400).render('404');
    }
};