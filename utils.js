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

const formatMovesData = (movesData) => {};

const formatTypesData = (typesData) => {};

module.exports = {
  collectPokemonData,
  collectMoveData,
  formatPokemonData,
  formatMovesData,
  formatTypesData,
};
