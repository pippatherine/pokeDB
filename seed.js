const db = require("./connection");
const format = require("pg-format");

const seed = () => {
  return db
    .query(`DROP TABLE IF EXISTS pokemon;`)
    .then(() => {
      return db.query(`CREATE TABLE pokemon (
        id INT SERIAL PRIMARY KEY,
        pokemon VARCHAR(30) NOT NULL,
        height INT NOT NULL,
        weight INT NOT NULL,
        sprite VARCHAR(255)
    );`);
    })
    .then(() => {
      
    })
    .catch((err) => console.log(err));
};

const runSeed = () => {
  return seed().then(() => db.end());
};

runSeed();
