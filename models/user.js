const bcrypt = require('bcrypt');
const db = require('../config/db');

const User = {};

User.create = (user) => {
  console.log('User create in model', user)
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

User.findAll = () => {
  return db.query(`
    SELECT * FROM users`);
};

User.findById = (id) => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE id = $1;`,
    [id]
  );
};

User.findByEmail = (email) => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE email = $1;`,
    [email]
  );
};

User.delete = (user) => {
  return db.none(`
    DELETE FROM users
    WHERE id = $1`,
    [id]
  );
};

module.exports = User;
