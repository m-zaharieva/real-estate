const router = require('express').Router();
const validator = require('validator');

const authService = require('./../services/authServices.js');
const { TOKEN_CONNECTION_NAME } = require('./../constants.js');



router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', (req, res) => {
    let { name, username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.status(400).render('register');
    }

    authService.register(name, username, password)
        .then(user => {
            return authService.createToken(user);
        })
        .then(token => {
            res.cookie(TOKEN_CONNECTION_NAME, token);
        });
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});



module.exports = router;