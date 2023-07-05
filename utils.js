const { fetchSinglePokemonData, fetchMoveByMoveId } = require("./api");

const collectPokemonData = (endingID, currentNumOfPoke = 0) => {
  const pokemonPromises = [];
  for (let i = currentNumOfPoke + 1; i <= endingID; i++) {
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

const findUniqueValues = (pokemonData, key = "moveIds") => {
  let newArray = [];
  for (let i = 0; i < pokemonData.length; i++) {
    let currentPokemon = pokemonData[i];
    newArray = [...newArray, ...currentPokemon[key]];
  }
  const newUniqueValues = new Set(newArray);

  return [...newUniqueValues];
};

const formatJunctionData = (pokemonData, key = "moveIds", lookupTable) => {
  const formattedJunctionData = [];

  for (let i = 0; i < pokemonData.length; i++) {
    const pokemon = pokemonData[i];
    for (let j = 0; j < pokemon[key].length; j++) {
      let secondValue = lookupTable
        ? lookupTable[pokemon[key][j]]
        : pokemon[key][j];

      formattedJunctionData.push([pokemon.id, secondValue]);
    }
  }
  return formattedJunctionData;
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

const createLookupTable = (data, key = "type", value = "type_id") => {
  const lookup = {};
  data.forEach((typeObject) => {
    lookup[typeObject[key]] = typeObject[value];
  });
  return lookup;
};

module.exports = {
  collectPokemonData,
  collectMoveData,
  formatJunctionData,
  findUniqueValues,
  formatData,
  createLookupTable,
};
