const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.index);

router.post('/', controller.create);

router.delete('/:taco_id/:user_id', controller.destroy);

module.exports = router;
