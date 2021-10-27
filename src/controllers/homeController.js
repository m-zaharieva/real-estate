const router = require('express').Router();
const estateServices = require('./../services/estateServices.js');



const homePage = (req, res) => {
    estateServices.getTopHouses()
        .then(housings => {
            res.render('home', {housings});
        })
        .catch(error => {
            res.locals.error = [error.message];
            res.status(400).render('home');
        });
};



router.get('/', homePage);

module.exports = router;