const router = require('express').Router();

const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');
const estateController = require('./controllers/estateController.js');


router.use(homeController);
router.use('/auth', authController);
router.use('/housing', estateController);



module.exports = router;