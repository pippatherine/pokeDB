const axios = require("axios");
const {
  formatMoveIdArray,
  formatTypeNamesArray,
  checkDescription,
} = require("./utils");

const pokeAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

const fetchSinglePokemonData = (id, apiObject = pokeAPI) => {
  return apiObject.get(`/pokemon/${id}`).then(({ data }) => {
    return (pokemonObject = {
      id: id,
      name: data.species.name,
      weight: data.weight,
      height: data.height,
      sprite: data.sprites.front_default,
      types: formatTypeNamesArray(data),
      moveIds: formatMoveIdArray(data),
    });
  });
};

const fetchMoveByMoveId = (moveId, apiObject = pokeAPI) => {
  return apiObject.get(`/move/${moveId}`).then(({ data }) => {
    return (moveObject = {
      id: data.id,
      name: data.name,
      pp: data.pp,
      power: data.power,
      description: checkDescription(data),
    });
  });
};

const collectPokemonData = (
  endingID,
  currentNumOfPoke = 0,
  apiObject = pokeAPI
) => {
  const pokemonPromises = [];
  for (let i = currentNumOfPoke + 1; i <= endingID; i++) {
    pokemonPromises.push(fetchSinglePokemonData(i, apiObject));
  }

  return Promise.all(pokemonPromises);
};

const collectMoveData = (moveIdArray, apiObj = pokeAPI) => {
  const movePromises = [];
  for (let i = 0; i < moveIdArray.length; i++) {
    movePromises.push(fetchMoveByMoveId(moveIdArray[i], apiObj));
  }
  return Promise.all(movePromises);
};

const getNumberOfPokemon = (apiObj = pokeAPI) => {
  return apiObj.get("/pokemon-species/?limit=0").then(({ data: { count } }) => {
    return count;
  });
};

module.exports = {
  fetchSinglePokemonData,
  fetchMoveByMoveId,
  getNumberOfPokemon,
  collectMoveData,
  collectPokemonData,
};
