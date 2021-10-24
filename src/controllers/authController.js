const router = require('express').Router();


router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', (req, res) => {
    let { name, username, password, repeatPassword } = req.body;
})

router.get('/login', (req, res) => {
    res.render('auth/login');
});



module.exports = router;