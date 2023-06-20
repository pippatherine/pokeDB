const db = require("./connection");
const format = require("pg-format");
const {
  collectPokemonData,
  formatPokemonData,
  formatMovesJunctionData,
  formatMovesArray,
  collectMoveData,
} = require("./utils");

const seed = () => {
  let pokemonData;
  return (
    db
      .query(`DROP TABLE IF EXISTS pokemon;`)
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS moves;`);
      })
      .then(() => {
        return db.query(`CREATE TABLE pokemon (
        id INT NOT NULL,
        pokemon VARCHAR(30) NOT NULL,
        weight INT NOT NULL,
        height INT NOT NULL,
        sprite VARCHAR(255) NOT NULL
    );`);
      })
      .then(() => {
        return db.query(`CREATE TABLE moves (
          move_id INT NOT NULL,
          name VARCHAR(30) NOT NULL,
          description VARCHAR(255) NOT NULL, 
          pp INT NOT NULL, 
          power INT NOT NULL
           );`);
      })

      // .then(() => {
      //   return db.query(`DROP TABLE IF EXISTS pokemon_moves`)
      // })
      .then(() => {
        return collectPokemonData(15);
      })
      .then((pokemon) => {
        pokemonData = pokemon;
        const arrayOfPokemonData = formatPokemonData(pokemon);
        const insertPokemonQuery = format(
          `INSERT INTO pokemon(id,pokemon,weight,height,sprite) VALUES %L RETURNING *`,
          arrayOfPokemonData
        );
        return db.query(insertPokemonQuery);
      })
      .then(() => {
        const moveIdsArray = formatMovesArray(pokemonData);
        return collectMoveData(moveIdsArray);
      })
      .then((moves) => {
        console.log(moves);
      })
      // .then(() => {
      //   const arrayOfMovesData = formatMovesJunctionData(pokemonData);
      //   const insertMovesData = format(
      //     `INSERT INTO pokemon_moves (id, move_id) VALUES %L RETURNING *`,
      //     arrayOfMovesData
      //   );
      // })
      .catch((err) => console.log(err))
  );
};

const runSeed = () => {
  return seed().then(() => db.end());
};

runSeed();
