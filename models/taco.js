const db = require('../config/db');

const Taco = {};

Taco.findAll = () => {
  return db.manyOrNone(`
    SELECT *
    FROM favorite_taco`
  );
}

Taco.addToFavorites = (taco) => {
  return db.none(
    `INSERT INTO favorite_taco
    (name, rating, address, phone_number, website, price, user_id)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)`,
    [taco.name, taco.rating, taco.address, taco.phone_number, taco.website, taco.price, taco.user_id]
  );
}

Taco.findByUserEmail = (email) => {
  return db.query(
    `SELECT
      favorite_taco.id,
      favorite_taco.name,
      favorite_taco.rating,
      favorite_taco.address,
      favorite_taco.phone_number,
      favorite_taco.website,
      favorite_taco.price,
      users.email,
      users.firstname,
      user_id
    FROM favorite_taco
    LEFT OUTER JOIN users
    ON users.id = favorite_taco.user_id
    WHERE email = $1`,
    [email]
  );
}

Taco.delete = (tacoId, userId) => {
  return db.none(
    `DELETE FROM favorite_taco
    WHERE id = $1 AND user_id = $2`,
    [tacoId, userId]
  );
}

module.exports = Taco;
