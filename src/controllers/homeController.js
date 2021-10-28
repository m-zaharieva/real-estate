const router = require('express').Router();
const estateServices = require('./../services/estateServices.js');
const homeServices = require('./../services/homeServices.js');



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

const searchPage = (req, res) => {
    res.render('search');
}

const searchHome = (req, res) => {
    let searchData = req.body;

    homeServices.search(searchData)
        .then(results => {
            res.render('search', {results});
        })
        .catch(err => {
            console.log(err)
        })
       
    
}

router.get('/', homePage);
router.get('/search', searchPage);
router.post('/search', searchHome)

module.exports = router;