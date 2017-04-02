const Taco = require('../../models/taco');

const controller = {};

controller.index = (req, res) => {
  Taco
  .findAll()
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    console.log('ERROR', err)
  });
}

controller.create = (req, res) => {
  Taco
  .addToFavorites(req.body.taco)
  .then((data) => {
    res.sendStatus(201);
  })
  .catch((err) => {
    console.log('ERROR', err)
  });
}

controller.destroy = (req, res) => {
  Taco
  .delete(req.params.taco_id, req.params.user_id)
  .then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('ERROR', err);
  })
}

module.exports = controller;
