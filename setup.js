const db = require("./connection");

const setup = () => {

  return db
    .query(`DROP TABLE IF EXISTS pokemon_moves;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS pokemon_types`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS moves;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS types`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS pokemon`);
    })
    .then(() => {
      return db.query(`CREATE TABLE pokemon (
        id INT PRIMARY KEY NOT NULL,
        pokemon VARCHAR(30) NOT NULL,
        weight INT NOT NULL,
        height INT NOT NULL,
        sprite VARCHAR(255) NOT NULL
    );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE moves (
          move_id INT PRIMARY KEY NOT NULL,
          name VARCHAR(30) NOT NULL,
          description VARCHAR, 
          pp INT NOT NULL, 
          power INT 
           );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE pokemon_moves (
          pokemon_id INT REFERENCES pokemon(id),
          move_id INT REFERENCES moves(move_id)
        )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE types (
        type_id SERIAL PRIMARY KEY,
        type VARCHAR(30)
      )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE pokemon_types (
        pokemon_id INT REFERENCES pokemon(id),
        type_id INT REFERENCES types(type_id)
      )`);
    })
    .catch((err) => console.log(err));
};

const runSetup = () => {
  return setup().then(() => db.end());
};

runSetup();
