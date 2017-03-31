const router = require('express').Router();
const controller = require('./controller');


router.post('/new', controller.create);

// router.get('/dashboard', controller.authorizeToken);

router.post('/login', controller.processLogin);




module.exports = router;
