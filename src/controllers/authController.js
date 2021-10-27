const router = require('express').Router();

const authServices = require('./../services/authServices.js');
const { TOKEN_CONNECTION_NAME } = require('./../constants.js');



const registerPage = (req, res) => {
    res.render('auth/register');
};

const registerUser = (req, res) => {
    let { name, username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        res.locals.error = ['Both passwords should be equal!'];
        return res.status(400).render('auth/register');
    }

    authServices.register(name, username, password)
        .then(user => {
            return authServices.createToken(user);
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

    authServices.login(username, password)
        .then(user => {
            if(!user) {
                throw new Error (['Incorect username or password!']);
            }
            return authServices.createToken(user)
        })
        .then(token => {
            res.cookie(TOKEN_CONNECTION_NAME, token, {
                httpOnly: true,
            });
            res.redirect('/');
        })
        .catch(error => {
            res.locals.error = [error.message];
            return res.status(400).render('auth/login');
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