const router = require('express').Router();

const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');
const estateController = require('./controllers/estateController.js');
const authMiddleware = require('./middlewares/authMiddleware.js');


router.use(homeController);
router.use('/auth', authController);
router.use('/housing', authMiddleware.isAuth, estateController);



module.exports = router;