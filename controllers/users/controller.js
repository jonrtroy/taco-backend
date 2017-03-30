const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

const controller = {};

const User = require('../../models/user');

controller.index = (req, res) => {
  User
    .findAll()
    .then((data) => res.json({ user: data }))
    .catch((err) => console.log('ERROR', err));
};

controller.new = (req, res) => {
  res.render('users/new');
}

controller.authorizeToken = (req, res) => {
  jwt.verify(req.headers.authorization, 'taco cat', (err, decoded) => {
    if (err) {
      console.log('error in controller.authorizeToken');
      res
        .status(401)
        .json({ error: err.message });
    } else {
    }
  });
}

controller.new = (req, res) => {
  res.render('users/new');
}

controller.create = (req, res) => {
  console.log('req body in controller.create', req.body);
  User
    .create(req.body.user)
    .then((data) => {
      console.log('data in controller', data);
      res.status(201)
      .json({ user: data })
    })
    .catch(err => console.log('ERROR', err));
};

controller.login  = (req, res) => {
  User
    .findByEmail(req.body.user.email)
    .then((user) => {
      // if user exists
      if (user) {
        // compare password with hashed password using bcrypt
        const isAuthed = bcrypt.compareSync(req.body.user.password, user.password_digest);
        if (isAuthed) {
          // create token with email from user record with options
          const token = jwt.sign({
            email: user.email,
            user_id: user.id
          }, 'taco cat', { expiresIn: '7d' });
          // respond with token
          res.json({ token });
          console.log('token in controller.process_login', token);
        } else {
        res.sendStatus(401)
        }
      } else {
        res.status(401)
        .json({ error: 'No user found' });
      }
    });
}


module.exports = controller;
