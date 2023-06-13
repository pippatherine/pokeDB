const axios = require("axios");

const pokeAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

const fetchSinglePokemonData = (id) => {
  pokeAPI.get(`/pokemon/${id}`).then(({ data }) => {
    console.log(data);
    
  });
  return {};
};

module.exports = { fetchSinglePokemonData };
