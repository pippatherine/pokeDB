const db = require("./connection");
const format = require("pg-format");

const seed = () => {
  return db
    .query(`DROP TABLE IF EXISTS pokemon;`)
    .then(() => {
      return db.query(`CREATE TABLE pokemon (
        id INT PRIMARY KEY,
        pokemon VARCHAR(30) NOT NULL,
        height INT NOT NULL,
        weight INT NOT NULL,
        sprite VARCHAR(255)
    );`);
    })
    .then(() => {
      return db.query("SELECT * FROM pokemon;").then(({ rows: pokemon }) => {
        console.log(pokemon);
      });
    })
    .catch((err) => console.log(err));
};

const runSeed = () => {
  return seed().then(() => db.end());
};

runSeed();
