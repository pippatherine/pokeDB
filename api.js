const axios = require("axios");

const pokeAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

const fetchSinglePokemonData = (id) => {
  return {};
};

module.exports = { fetchSinglePokemonData };
