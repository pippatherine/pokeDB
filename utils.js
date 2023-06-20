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

const arrangeMovesArray = (pokemonData) => {
  let newMovesArray = [];
  for (let i = 0; i < pokemonData.length; i++) {
    let currentPokemon = pokemonData[i];
    newMovesArray = [...newMovesArray, ...currentPokemon.moveIds];
  }
  const newUniqueMoves = new Set(newMovesArray);

  return [...newUniqueMoves];
};

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

const formatData = (data, listOfKeys) => {
  const dataArray = [];
  for (let i = 0; i < data.length; i++) {
    const datumArray = [];

    for (let j = 0; j < listOfKeys.length; j++) {
      const currentObj = data[i];
      datumArray.push(currentObj[listOfKeys[j]]);
    }

    dataArray.push(datumArray);
  }
  return dataArray;
};

module.exports = {
  collectPokemonData,
  collectMoveData,
  formatPokemonData,
  formatMovesJunctionData,
  arrangeMovesArray,
  formatTypesData,
  formatData,
};
