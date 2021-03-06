const User = require('../../models/user');
const Taco = require('../../models/taco');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const controller = {};

controller.create = (req, res) => {
  console.log('req body in controller', req.body)
  User
    .create(req.body.user)
    .then((data) => {
      console.log('data in controller', data)
      res.status(201)
      res.json({ user: data })
    })
    .catch(err => console.log('ERROR', err));
};


controller.authorizeToken = (req, res) => {
  jwt.verify(req.headers.authorization, "taco cat", (err, decoded) => {
    if (err) {
      console.log("**********",err);
      res
      .status(401)
      .json({ error: err.message });
    } else {
      Taco
        .findByUserEmail(decoded.email)
        .then((data) => {
          res.json({
            data: data,
            user_id: decoded.user_id
          });
        })
        .catch((err) => {
          console.log('ERROR', err);
        })
      console.log('JSON Decoded', decoded);
    }
  });
}

controller.processLogin = (req, res) => {
  User
    .findByEmail(req.body.user.email)
    .then((user) => {
      // If user exists
      if (user) {
        // Compare password with hashed password - will return boolean
        const isAuthed = bcrypt.compareSync(req.body.user.password, user.password_digest);
        if (isAuthed) {
          // Create JWT with email from user record with options
          const token = jwt.sign({
            email : user.email,
            user_id: user.id
          }, 'taco cat', { expiresIn: '7d' });
          // Respond with JWT token
          res.json({ token: {
            token: token,
            user_id: user.id,
            loggedIn: true
          }
        });
        } else {
          // Else send status 401
          res.sendStatus(401);
        }
      } else {
        res.status(404)
        .json({ error: "No user found "});
      }
    });
}

module.exports = controller;
