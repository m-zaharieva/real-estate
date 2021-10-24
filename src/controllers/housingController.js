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
            if (home) {

                // TODO: redirect to the 'housing for rent' page;
                res.redirect('/');
            }
        });
});

router.get('/forRent', (req, res) => {
    housingServices.getAll()
        .then(houses => {
            res.render('housing/forRent', {houses});
        });
 });

router.get('/:houseId', (req, res) => {
    let houseId = req.params.houseId;
    let isAuth = req.isAuth;
    housingServices.getOne(houseId)
    .then(house => {
            let isOwner = req.user?._id == house.ownerId;
            let isRented = house.rented.some(x => x._id == [req.user?._id]);
            res.render('housing/details', { ...house, isAuth, isOwner, isRented });
        });
});

router.get('/:houseId/edit', (req, res) => {
    let houseId = req.params.houseId;
    housingServices.getOne(houseId)
        .then(house => {
            res.render('housing/edit', {...house});
        });
});

router.post('/:houseId/edit', (req, res) => {
   let house = req.body;
   let houseId = req.params.houseId;
   housingServices.update(houseId, house)
    .then(updatedHouse => {
        updatedHouse.save();
        res.redirect(`/housing/${houseId}`);
    }) 
});

router.get('/:houseId/delete', (req, res) => {
    let houseId = req.params.houseId;
    housingServices.deleteOne(houseId)
        .then(house => {
            console.log(house);
            res.redirect('/housing/forRent');
        })
        .catch(err => {
            console.log(err);
        });
});






module.exports = router;