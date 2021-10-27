const router = require('express').Router();

const estateServices = require('./../services/estateServices.js')
const guards = require('./../middlewares/guards.js');



const createPage = (req, res) => {
    res.render('housing/create');
};

const createHome = (req, res) => {
    let housing = req.body;
    let ownerId = req.user;
    estateServices.create(housing, ownerId)
        .then(home => {
            if (home) {
                res.redirect('/housing/forRent');
            }
        })
        .catch(error => {
            let errors = Object.keys(error.errors).map(v => error.errors[v].message);
            res.locals.error = errors;
            res.status(400).render('housing/create');
        });
};

const forRentPage = (req, res, next) => {
    estateServices.getAll()
        .then(houses => {
            res.render('housing/forRent', { houses });
        })
        .catch(error => {
            next(error);
        });
};

const detailsPage = (req, res, next) => {
    let houseId = req.params.houseId;
    let isUser = req.isUser;
    estateServices.getOne(houseId)
        .then(house => {
            let isOwner = req.user?._id == house.ownerId;
            let isRented = house.rented.some(x => x._id == req.user?._id);
            house.rented = house.rented.map(user => user = user.name).join(', ');
            res.render('housing/details', { ...house, isUser, isOwner, isRented });
        })
        .catch(error => {
            next(error);
        });
}

const editPage = (req, res) => {
    let houseId = req.params.houseId;
    estateServices.getOne(houseId)
        .then(house => {
            res.render('housing/edit', { ...house });
        })
        .catch(error => {
            console.log('Edit Page Error');
        });
};

const editHome = (req, res) => {
    let house = req.body;
    let houseId = req.params.houseId;
    estateServices.update(houseId, house)
        .then(updatedHouse => {
            updatedHouse.save();
            res.redirect(`/housing/${houseId}`);
        })
        .catch(error => {
            let errors = Object.keys(error.errors).map(v => error.errors[v].message);
            res.locals.error = errors;
            res.status(400).render(`/housing/${houseId}`);
        });
};

const deleteHome = (req, res) => {
    let houseId = req.params.houseId;
    estateServices.deleteOne(houseId)
        .then(house => {
            console.log(house);
            res.redirect('/housing/forRent');
        })
        .catch(err => {
            console.log('Delete Home error');
        });
};

const rentHome = (req, res) => {
    let houseId = req.params.houseId;
    let user = req.user;
    estateServices.rent(houseId, user)
        .then(house => {
            res.redirect(`/housing/${houseId}`);
        });

};



router.get('/create', guards.isUser, createPage);
router.post('/create', guards.isUser, createHome);
router.get('/forRent', forRentPage);
router.get('/:houseId', guards.isUser, detailsPage);
router.get('/:houseId/edit', guards.isUser, editPage);
router.post('/:houseId/edit', guards.isUser, editHome);
router.get('/:houseId/delete', guards.isUser, deleteHome);
router.get('/:houseId/rent', guards.isUser, rentHome);

module.exports = router;