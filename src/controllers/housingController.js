const router = require('express').Router();


router.get('/create', (req, res) => {
   res.render('housing/create');
});



module.exports = router;