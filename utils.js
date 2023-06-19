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

module.exports = { collectPokemonData, collectMoveData };
