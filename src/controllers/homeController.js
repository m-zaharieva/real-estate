const router = require('express').Router();
const homeServices = require('./../services/homeServices.js');

router.get('/', (req, res) => {
    homeServices.allHousings()
        .then(housings => {
            console.log(housings)
            res.render('home', {housings});
        })
})

module.exports = router;