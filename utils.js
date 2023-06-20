const { fetchSinglePokemonData, fetchMoveByMoveId } = require("./api");

const collectPokemonData = (num) => {
  const pokemonPromises = [];
  for (let i = 1; i <= num; i++) {
    pokemonPromises.push(fetchSinglePokemonData(i));
  }
  return Promise.all(pokemonPromises);
};

const collectMoveData = (moveIdArray) => {
  const movePromises = [];
  for (let i = 0; i < moveIdArray.length; i++) {
    movePromises.push(fetchMoveByMoveId(moveIdArray[i]));
  }
  return Promise.all(movePromises);
};

const formatPokemonData = (pokemonData) => {
  const formattedData = [];
  for (let i = 0; i < pokemonData.length; i++) {
    const pokemon = pokemonData[i];
    formattedData.push([
      pokemon.id,
      pokemon.name,
      pokemon.weight,
      pokemon.height,
      pokemon.sprite,
    ]);
  }
  return formattedData;
};

const formatMovesArray = (pokemonData) => {
  return [];
};
// need to use pokemonData to populate moves table

const formatMovesJunctionData = (pokemonData) => {
  const formattedMovesJunctionData = [];

  for (let i = 0; i < pokemonData.length; i++) {
    const pokemon = pokemonData[i];
    for (let j = 0; j < pokemon.moveIds.length; j++) {
      formattedMovesJunctionData.push([pokemon.id, pokemon.moveIds[j]]);
    }
  }

  return formattedMovesJunctionData;
};

const formatTypesData = (pokemonData) => {
  return [];
};

module.exports = {
  collectPokemonData,
  collectMoveData,
  formatPokemonData,
  formatMovesJunctionData,
  formatMovesArray,
  formatTypesData,
};
