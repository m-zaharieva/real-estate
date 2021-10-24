const router = require('express').Router();

const housingServices = require('./../services/housingServices.js')

router.get('/create', (req, res) => {
    res.render('housing/create');
});

router.post('/create', (req, res) => {
    let housing = req.body;
    let ownerId = req.user;
    housingServices.create(housing, ownerId)
        .then(home => {
            console.log(home);
        });
})





module.exports = router;