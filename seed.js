const db = require("./connection");
const format = require("pg-format");
const { collectPokemonData, formatPokemonData } = require("./utils");

const seed = () => {
  return db
    .query(`DROP TABLE IF EXISTS pokemon;`)
    .then(() => {
      return db.query(`CREATE TABLE pokemon (
        id INT NOT NULL,
        pokemon VARCHAR(30) NOT NULL,
        height INT NOT NULL,
        weight INT NOT NULL,
        sprite VARCHAR(255) NOT NULL
    );`);
    })
    .then(() => {
      return collectPokemonData(100);
    })
    .then((pokemon) => {
      const arrayOfPokemonData = formatPokemonData(pokemon);
      const insertPokemonQuery = format(
        `INSERT INTO pokemon(id,pokemon,height,weight,sprite) VALUES %L RETURNING *`,
        arrayOfPokemonData
      );
      return db.query(insertPokemonQuery);
    })
    .then(({ rows }) => {
      console.log(rows);
    })
    .catch((err) => console.log(err));
};

const runSeed = () => {
  return seed().then(() => db.end());
};

runSeed();
