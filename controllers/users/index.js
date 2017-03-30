const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.index);

router.get('/new', controller.new);

// router.get('/dashboard', controller.authorizeToken);

router.post('/login', controller.login);

router.post('/signup', controller.create);



module.exports = router;
