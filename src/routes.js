const router = require('express').Router();

const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');
const housingController = require('./controllers/housingController.js');
const { isAuth } = require('./middlewares/authMiddleware.js');


router.use(homeController);
router.use('/auth', authController);
router.use('/housing', isAuth, housingController);



module.exports = router;