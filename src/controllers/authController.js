const router = require('express').Router();

const authServices = require('./../services/authServices.js');
const { TOKEN_CONNECTION_NAME } = require('./../constants.js');
const guards = require('./../middlewares/guards.js');


const registerPage = (req, res) => {
    res.render('auth/register');
};

const registerUser = (req, res) => {
    let { name, username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        let ctx = {
            error: ['Passwords don\'t match!'],
            name,
            username,
        }
        return res.render('auth/register', ctx);
    }

    authServices.findOne(username)
        .then(user => {
            if (user) {
                throw new Error('Username is already taken!')
            }
        })
        .catch(error => {
            let ctx = {
                error: [error.message],
                name,
            };
            return res.render('auth/register', ctx);
        })

    authServices.register(name, username, password)
        .then(user => {
            return authServices.createToken(user);
        })
        .then(token => {
            authServices.setCookie(res, token);
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
            if (!user) {
                throw new Error(['Incorect username or password!']);
            }
            return authServices.createToken(user)
        })
        .then(token => {
            authServices.setCookie(res, token);
            res.redirect('/');
        })
        .catch(error => {
            let ctx = {
                error: [error.message],
                username,
            };
            return res.render('auth/login', ctx);
        });
};

const logoutUser = (req, res) => {
    res.clearCookie(TOKEN_CONNECTION_NAME);
    res.redirect('/');
};



router.get('/register', guards.isGuest, registerPage);
router.post('/register', guards.isGuest, registerUser);
router.get('/login', guards.isGuest, loginPage);
router.post('/login', guards.isGuest, loginUser);
router.get('/logout', guards.isUser, logoutUser);

module.exports = router;