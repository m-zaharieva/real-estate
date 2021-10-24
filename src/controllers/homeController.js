const router = require('express').Router();
const homeServices = require('./../services/homeServices.js');

router.get('/', (req, res) => {
    homeServices.allHousings()
        .then(housings => {
            let topHouses = housings.slice(-3);
            console.log(topHouses);
            res.render('home', {topHouses});
        })
})

module.exports = router;