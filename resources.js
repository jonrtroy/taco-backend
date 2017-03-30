const router = require('express').Router();

router.use('/users', require('./controllers/users'));

router.use('/tacos', require('./controllers/tacos'));

router.use('/api', require('./controllers/api'));

module.exports = router;
