const { fetchSinglePokemonData } = require("./api");

const collectPokemonData = () => {
  const pokemonPromises = [];
  for (let i = 1; i <= 151; i++) {
    pokemonPromises.push(fetchSinglePokemonData(i));
  }
  return Promise.all(pokemonPromises);
};

const collectMoveData = () => {};

module.exports = { collectPokemonData, collectMoveData };
