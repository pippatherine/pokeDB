const { fetchSinglePokemonData, fetchMoveByMoveId } = require("./api");



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

const findNewUniqueValues = (existingValues, newValues) => {
  return newValues.filter((newValue) => {
    return !existingValues.includes(newValue);
  });
};

const formatMoveIdArray = (pokeData) => {
  const moveIdArray = pokeData.moves.map((moveObject) => {
    const moveURL = moveObject.move.url;
    const moveArray = moveURL.split("/");
    const moveId = parseInt(moveArray[moveArray.length - 2]);
    return moveId;
  });
  return moveIdArray;
};

module.exports = {
  findNewUniqueValues,
  collectPokemonData,
  collectMoveData,
  formatJunctionData,
  findUniqueValues,
  formatData,
  createLookupTable,
  formatMoveIdArray,
};
