const { fetchSinglePokemonData } = require("./api");

const collectPokemonData = (num) => {
  const pokemonPromises = [];
  for (let i = 1; i <= num; i++) {
    pokemonPromises.push(fetchSinglePokemonData(i));
  }

  return Promise.all(pokemonPromises).then((pokemon) => {
    return pokemon;
  });
};

const collectMoveData = () => {};

module.exports = { collectPokemonData, collectMoveData };
