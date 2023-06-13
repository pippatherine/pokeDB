const axios = require("axios");

const pokeAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

const fetchSinglePokemonData = (id) => {
  let pokemonObject = {};

  return pokeAPI.get(`/pokemon/${id}`).then(({ data }) => {
    const typesArray = data.types.map((typeObject) => {
      return typeObject.type.name;
    });
    const moveIdArray = data.moves.map((moveObject) => {
      const moveURL = moveObject.move.url;
      const moveArray = moveURL.split("/");
      const moveId = parseInt(moveArray[moveArray.length - 2]);
      return moveId;
    });

    pokemonObject = {
      name: data.species.name,
      weight: data.weight,
      height: data.height,
      sprite: data.sprites.front_default,
      types: typesArray,
      moveIds: moveIdArray,
    };

    return pokemonObject;
  });
};

module.exports = { fetchSinglePokemonData };
