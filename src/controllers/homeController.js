const router = require('express').Router();
const homeServices = require('./../services/homeServices.js');



const homePage = (req, res) => {
    homeServices.allHousings()
        .then(housings => {
            let topHouses = housings.slice(-3);
            console.log(topHouses);
            res.render('home', {topHouses});
        });
};



router.get('/', homePage);

module.exports = router;