const router = require('express').Router();

const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');
const housingController = require('./controllers/housingController.js');


router.use(homeController);
router.use('/auth', authController);
router.use('/housing', housingController);



module.exports = router;