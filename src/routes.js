const router = require('express').Router();

const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');
const estateController = require('./controllers/estateController.js');


router.use(homeController);
router.use('/auth', authController);
router.use('/housing', estateController);

router.get('*', (req, res) => {
    res.render('404');
})



module.exports = router;