const db = require('../config/db');
const bcrypt = require('bcrypt');

let User = {};

User.create = (user) => {
  console.log('user create', user)
  const password = bcrypt.hashSync(user.password_digest, 10);
  return db.one(`
    INSERT INTO users
    (firstname, lastname, email, password_digest)
    VALUES
    ($1, $2, $3, $4) RETURNING *`,
    [
      user.firstname,
      user.lastname,
      user.email,
      password
    ]);
}


User.findByEmail = (email) => {
  return db.one(`
    SELECT * FROM users
    WHERE email = $1;`,
    [email]
  );
};

module.exports = User;
