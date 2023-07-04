const format = require("pg-format");
const {
  collectPokemonData,
  formatJunctionData,
  findUniqueValues,
  collectMoveData,
  formatData,
  createLookupTable,
} = require("./utils");
const db = require("./connection");

let pokemonData;

// Check the db, find out how many pokemon are there
// If there are 100, start collectPokemonData at 101
// continue collecting pokedata by Id until you get undefined

const updateDB = () => {
  return collectPokemonData(151)
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
      const moveIdsArray = findUniqueValues(pokemonData);
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
        `INSERT INTO pokemon_moves (pokemon_id, move_id) VALUES %L;`,
        arrayOfMovesData
      );
      return db.query(insertMovesDataQuery);
    })
    .then(() => {
      const arrayOfTypes = findUniqueValues(pokemonData, "types");

      const formattedTypes = arrayOfTypes.map((type) => {
        return [type];
      });

      const insertTypesQuery = format(
        `INSERT INTO types 
    (type)
    VALUES %L RETURNING *;`,
        formattedTypes
      );
      return db.query(insertTypesQuery);
    })
    .then(({ rows: insertedTypesData }) => {
      const lookupTable = createLookupTable(insertedTypesData);

      const arrayOfTypesData = formatJunctionData(
        pokemonData,
        "types",
        lookupTable
      );
      const insertTypesDataQuery = format(
        `
  INSERT INTO pokemon_types
  (pokemon_id,type_id)
  VALUES
  %L;
  `,
        arrayOfTypesData
      );
      return db.query(insertTypesDataQuery);
    })
    .catch((err) => console.log(err));
};

updateDB();

module.exports = updateDB;
