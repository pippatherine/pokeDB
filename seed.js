const db = require("./connection");
const format = require("pg-format");
const {
  collectPokemonData,
  formatJunctionData,
  arrangeMovesArray,
  collectMoveData,
  formatData,
} = require("./utils");

const seed = () => {
  let pokemonData;
  return db
    .query(`DROP TABLE IF EXISTS pokemon_moves;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS types`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS moves;`);
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
          id INT REFERENCES pokemon(id),
          move_id INT REFERENCES moves(move_id)
        )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE types (
        id INT REFERENCES pokemon(id),
        type VARCHAR(30)
      )`);
    })
    .then(() => {
      return collectPokemonData(151);
    })
    .then((pokemon) => {
      pokemonData = pokemon;
      const pokemonKeys = ["id", "name", "weight", "height", "sprite"];
      const arrayOfPokemonData = formatData(pokemon, pokemonKeys);
      const insertPokemonQuery = format(
        `INSERT INTO pokemon(id,pokemon,weight,height,sprite) VALUES %L RETURNING *`,
        arrayOfPokemonData
      );
      return db.query(insertPokemonQuery);
    })
    .then(() => {
      const moveIdsArray = arrangeMovesArray(pokemonData);
      return collectMoveData(moveIdsArray);
    })
    .then((moves) => {
      const listOfKeys = ["id", "name", "pp", "power", "description"];
      const formattedMoves = formatData(moves, listOfKeys);
      const insertMovesQuery = format(
        `INSERT INTO moves 
          (move_id, name, pp, power, description )
          VALUES
          %L
          RETURNING *`,
        formattedMoves
      );
      return db.query(insertMovesQuery);
    })
    .then(() => {
      const arrayOfMovesData = formatJunctionData(pokemonData);
      const insertMovesDataQuery = format(
        `INSERT INTO pokemon_moves (id, move_id) VALUES %L;`,
        arrayOfMovesData
      );
      return db.query(insertMovesDataQuery);
    })
    .then(() => {
      const arrayOfTypesData = formatJunctionData(pokemonData, "types");
      const insertTypesDataQuery = format(
        `
      INSERT INTO types
      (id,type)
      VALUES
      %L;
      `,
        arrayOfTypesData
      );
      return db.query(insertTypesDataQuery);
    })
    .catch((err) => console.log(err));
};

const runSeed = () => {
  return seed().then(() => db.end());
};

runSeed();
