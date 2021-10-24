const router = require('express').Router();
const estateServices = require('./../services/estateServices.js');



const homePage = (req, res) => {
    estateServices.getAll()
        .then(housings => {
            let topHouses = housings.slice(-3);
            res.render('home', {topHouses});
        });
};



router.get('/', homePage);

module.exports = router;