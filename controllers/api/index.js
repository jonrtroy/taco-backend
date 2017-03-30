const router = require('express').Router();
const controller = require('./controller');

router.get ('/yelp/:lat/:lng', controller.taco);

module.exports = router;
