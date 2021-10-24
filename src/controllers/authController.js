const router = require('express').Router();
const validator = require('validator');

const authService = require('./../services/authServices.js');
const { TOKEN_CONNECTION_NAME } = require('./../constants.js');



const registerPage = (req, res) => {
    res.render('auth/register');
};

const registerUser = (req, res) => {
    let { name, username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        res.locals.error = ['Both passwords should be equal!'];
        return res.status(400).render('register');
    }

    authService.register(name, username, password)
        .then(user => {
            return authService.createToken(user);
        })
        .then(token => {
            res.cookie(TOKEN_CONNECTION_NAME, token, {
                httpOnly: true,
            });
            res.redirect('/');
        })
        .catch(error => {
            let errors = Object.keys(error.errors).map(v => error.errors[v].message);
            res.locals.error = errors;
            return res.status(400).render('auth/register');
        });
};

const loginPage = (req, res) => {
    res.render('auth/login');
};

const loginUser = (req, res) => {
    let { username, password } = req.body;

    authService.login(username, password)
        .then(user => {
            return authService.createToken(user)
        })
        .then(token => {
            res.cookie(TOKEN_CONNECTION_NAME, token, {
                httpOnly: true,
            });
            res.redirect('/');
        })
        .catch(error => {
            res.locals.error = ['Username or password don\'t match!']
            res.status(400).render('auth/login');
        });
};

const logoutUser = (req, res) => {
    res.clearCookie(TOKEN_CONNECTION_NAME);
    res.redirect('/');
};



router.get('/register', registerPage);
router.post('/register', registerUser);
router.get('/login', loginPage);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

module.exports = router;