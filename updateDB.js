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
const { getNumberOfPokemon } = require("./api");

let pokemonData;
let numberOfPokemonInDB;
// Check the db, find out how many pokemon there are
// If there are 100, start collectPokemonData at 101
// continue collecting pokedata by Id until you get undefined
// TODO: duplicates of types & moves because checking new not checking old

const updateDB = () => {
  return db
    .query(`SELECT * FROM pokemon;`)
    .then(({ rows: pokemon }) => {
      numberOfPokemonInDB = pokemon.length;
    })
    .then(() => {
      return getNumberOfPokemon();
    })
    .then((numberOfPokemon) => {
      return collectPokemonData(numberOfPokemon, numberOfPokemonInDB);
    })
    .then((pokemon) => {
      pokemonData = pokemon;
      if (pokemonData.length === 0) {
        return;
      }
      const pokemonKeys = ["id", "name", "weight", "height", "sprite"];
      const arrayOfPokemonData = formatData(pokemon, pokemonKeys);

      const insertPokemonQuery = format(
        `INSERT INTO pokemon(id,pokemon,weight,height,sprite) VALUES %L;`,
        arrayOfPokemonData
      );
      return db.query(insertPokemonQuery);
    })
    .then(() => {
      return db
        .query("SELECT moves.move_id FROM moves;")
        .then(({ rows: existingMoveObjects }) => {
          return (existingMoveIds = existingMoveObjects.map((moveObject) => {
            return moveObject.move_id;
          }));
        });
    })
    .then((existingMovesArray) => {
      const moveIdsArray = findUniqueValues(pokemonData);

      // the move id array passed to collect move data needs to only contain values that dont exist in existing moves array!
      const newMoveIds = moveIdsArray.filter(
        (id) => !existingMovesArray.includes(id)
      );

      return collectMoveData(newMoveIds);
    })
    .then((moves) => {
      if (moves.length === 0) {
        return;
      }

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
      if (pokemonData.length === 0) {
        return;
      }
      const arrayOfMovesData = formatJunctionData(pokemonData);
      const insertMovesDataQuery = format(
        `INSERT INTO pokemon_moves (pokemon_id, move_id) VALUES %L RETURNING *;`,
        arrayOfMovesData
      );
      return db.query(insertMovesDataQuery);
    })
    .then(() => {
      return db
        .query("SELECT types.type FROM types;")
        .then(({ rows: existingTypeObjects }) => {
          const existTypes = existingTypeObjects;

          return existingTypeObjects.map((typeObject) => {
            return typeObject.type;
          });
        });
    })
    .then((existingTypes) => {
      const arrayOfTypes = findUniqueValues(pokemonData, "types");

      const newTypes = arrayOfTypes.filter((typeName) => {
        return !existingTypes.includes(typeName);
      });

      return newTypes.map((type) => {
        return [type];
      });
    })
    .then((types) => {
      if (types.length === 0) {
        return;
      }

      const insertTypesQuery = format(
        `INSERT INTO types 
    (type)
    VALUES %L RETURNING *;`,
        types
      );
      return db.query(insertTypesQuery);
    })

    .then((response) => {
      if (response === undefined) {
        return;
      }
      const lookupTable = createLookupTable(response.rows);

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
