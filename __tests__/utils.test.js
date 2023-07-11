const {
  collectPokemonData,
  collectMoveData,
  findUniqueValues,
  formatJunctionData,
  formatData,
  createLookupTable,
  findNewUniqueValues,
  formatMoveIdArray,
} = require("../utils");



describe("formatJunctionData", () => {
  test("should return an array of arrays", () => {
    const pokemonData = [
      {
        id: 147,
        name: "dratini",
        weight: 33,
        height: 18,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
        types: ["dragon"],
        moveIds: [20, 21, 29],
      },
      {
        id: 148,
        name: "dragonair",
        weight: 165,
        height: 40,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png",
        types: ["dragon"],
        moveIds: [20, 21],
      },

      {
        id: 149,
        name: "dragonite",
        weight: 2100,
        height: 22,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
        types: ["dragon", "flying"],
        moveIds: [5, 7, 8, 9],
      },
    ];
    const result = formatJunctionData(pokemonData);
    expect(result).toHaveLength(9);
    expect(result).toBeInstanceOf(Array);
    result.forEach((aPokemonsMoves) => {
      expect(aPokemonsMoves).toBeInstanceOf(Array);
    });
  });
  test("should return single pokemons moves in a nested array", () => {
    const pokemonData = [
      {
        id: 147,
        name: "dratini",
        weight: 33,
        height: 18,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
        types: ["dragon"],
        moveIds: [20, 21, 29],
      },
    ];
    const expected = [
      [147, 20],
      [147, 21],
      [147, 29],
    ];
    expect(formatJunctionData(pokemonData)).toEqual(expected);
  });
  test("should return multiple pokemons moves in a nested array", () => {
    const pokemonData = [
      {
        id: 147,
        name: "dratini",
        weight: 33,
        height: 18,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
        types: ["dragon"],
        moveIds: [20, 21, 29],
      },
      {
        id: 149,
        name: "dragonite",
        weight: 2100,
        height: 22,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
        types: ["dragon", "flying"],
        moveIds: [5, 7, 8, 9],
      },
    ];
    const expected = [
      [147, 20],
      [147, 21],
      [147, 29],
      [149, 5],
      [149, 7],
      [149, 8],
      [149, 9],
    ];
    expect(formatJunctionData(pokemonData)).toEqual(expected);
  });
  test("should return new array", () => {
    const input = [];
    const output = formatJunctionData(input);
    expect(input).not.toBe(output);
  });
  test("should not mutate array", () => {
    const pokemonData = [
      {
        id: 147,
        name: "dratini",
        weight: 33,
        height: 18,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
        types: ["dragon"],
        moveIds: [20, 21, 29],
      },
      {
        id: 149,
        name: "dragonite",
        weight: 2100,
        height: 22,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
        types: ["dragon", "flying"],
        moveIds: [5, 7, 8, 9],
      },
    ];
    const pokemonDataTwin = [
      {
        id: 147,
        name: "dratini",
        weight: 33,
        height: 18,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
        types: ["dragon"],
        moveIds: [20, 21, 29],
      },
      {
        id: 149,
        name: "dragonite",
        weight: 2100,
        height: 22,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
        types: ["dragon", "flying"],
        moveIds: [5, 7, 8, 9],
      },
    ];
    formatJunctionData(pokemonData);
    expect(pokemonData).toEqual(pokemonDataTwin);
  });
  test("should take a key parameter, which alters the values taken from the data", () => {
    const pokemonData = [
      {
        id: 147,
        name: "dratini",
        weight: 33,
        height: 18,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
        types: ["dragon"],
        moveIds: [20, 21, 29],
      },
      {
        id: 149,
        name: "dragonite",
        weight: 2100,
        height: 22,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
        types: ["dragon", "flying"],
        moveIds: [5, 7, 8, 9],
      },
    ];
    const result = formatJunctionData(pokemonData, "types");
    const expected = [
      [147, "dragon"],
      [149, "dragon"],
      [149, "flying"],
    ];
  });
  test("if given lookup table should use it to define returned data ", () => {
    const pokemonData = [
      {
        id: 147,
        name: "dratini",
        weight: 33,
        height: 18,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
        types: ["dragon"],
        moveIds: [20, 21, 29],
      },
      {
        id: 149,
        name: "dragonite",
        weight: 2100,
        height: 22,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
        types: ["dragon", "flying"],
        moveIds: [5, 7, 8, 9],
      },
    ];

    const lookupTable = { dragon: 1, flying: 2 };
    const result = formatJunctionData(pokemonData, "types", lookupTable);
    const expected = [
      [147, 1],
      [149, 1],
      [149, 2],
    ];
    expect(result).toEqual(expected);
  });
});

describe("findUniqueValues", () => {
  test("should return an array", () => {
    const pokemonData = [
      {
        id: 147,
        name: "dratini",
        weight: 33,
        height: 18,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
        types: ["dragon"],
        moveIds: [20, 21, 29],
      },
    ];
    expect(findUniqueValues(pokemonData)).toBeInstanceOf(Array);
  });

  test("when passed a single pokemon object array should return an array of their moves", () => {
    const pokemonData = [
      {
        id: 147,
        name: "dratini",
        weight: 33,
        height: 18,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
        types: ["dragon"],
        moveIds: [20, 21, 29],
      },
    ];
    expect(findUniqueValues(pokemonData)).toEqual([20, 21, 29]);
  });
  test("when passed a multiple pokemon object array should return an array of their moves", () => {
    const pokemonData = [
      {
        id: 147,
        name: "dratini",
        weight: 33,
        height: 18,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
        types: ["dragon"],
        moveIds: [20, 21, 29],
      },
      {
        id: 149,
        name: "dragonite",
        weight: 2100,
        height: 22,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
        types: ["dragon", "flying"],
        moveIds: [5, 7, 8, 9],
      },
    ];
    expect(findUniqueValues(pokemonData)).toEqual([20, 21, 29, 5, 7, 8, 9]);
  });

  test("should not repeat any moves within the array", () => {
    const pokemonData = [
      {
        id: 147,
        name: "dratini",
        weight: 33,
        height: 18,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
        types: ["dragon"],
        moveIds: [20, 21, 29, 5, 7],
      },
      {
        id: 149,
        name: "dragonite",
        weight: 2100,
        height: 22,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
        types: ["dragon", "flying"],
        moveIds: [5, 7, 8, 9],
      },
    ];
    expect(findUniqueValues(pokemonData)).toEqual([20, 21, 29, 5, 7, 8, 9]);
  });
  test("should not mutate the input", () => {
    const pokemonData = [
      {
        id: 147,
        name: "dratini",
        weight: 33,
        height: 18,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
        types: ["dragon"],
        moveIds: [20, 21, 29],
      },
    ];
    const pokemonDataTwin = [
      {
        id: 147,
        name: "dratini",
        weight: 33,
        height: 18,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
        types: ["dragon"],
        moveIds: [20, 21, 29],
      },
    ];
    findUniqueValues(pokemonData);
    expect(pokemonData).toEqual(pokemonDataTwin);
  });
  test("should return a new array ", () => {
    const pokemonData = [
      {
        id: 147,
        name: "dratini",
        weight: 33,
        height: 18,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
        types: ["dragon"],
        moveIds: [20, 21, 29],
      },
    ];
    const output = findUniqueValues(pokemonData);
    expect(output).not.toBe(pokemonData);
  });
  test("should take a second argument and find corresponding values ", () => {
    const pokemonData = [
      {
        id: 147,
        name: "dratini",
        weight: 33,
        height: 18,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
        types: ["dragon"],
        moveIds: [20, 21, 29],
      },
      {
        id: 147,
        name: "dragon",
        weight: 33,
        height: 18,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
        types: ["dragon", "normal"],
        moveIds: [20, 21, 29],
      },
    ];
    const key = "types";
    expect(findUniqueValues(pokemonData, key)).toEqual(["dragon", "normal"]);
  });
});

describe("formatData", () => {
  test("should return an array of arrays", () => {
    const testData = [
      {
        id: 147,
        name: "katherine",
        hat: false,
      },
      {
        id: 148,
        name: "pippa",
        hat: true,
      },
    ];
    const listOfKeys = ["id", "name"];
    const result = formatData(testData, listOfKeys);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
    result.forEach((person) => {
      expect(person).toBeInstanceOf(Array);
    });
  });
  test("should take single object array and return array containing array with keys passed in second arg", () => {
    const testData = [
      {
        id: 148,
        name: "pippa",
        hat: true,
      },
    ];
    const listOfKeys = ["id", "name"];
    const result = formatData(testData, listOfKeys);
    const expected = [[148, "pippa"]];
    expect(result).toEqual(expected);
  });
  test("should take single object array and return array containing array with keys passed in second arg", () => {
    const testData = [
      {
        id: 148,
        name: "pippa",
        hat: true,
      },
      {
        id: 147,
        name: "katherine",
        hat: false,
      },
    ];
    const listOfKeys = ["id", "name"];
    const result = formatData(testData, listOfKeys);
    const expected = [
      [148, "pippa"],
      [147, "katherine"],
    ];
    expect(result).toEqual(expected);
  });
  test("should return new array", () => {
    const testData = [
      {
        id: 148,
        name: "pippa",
        hat: true,
      },
      {
        id: 147,
        name: "katherine",
        hat: false,
      },
    ];
    const listOfKeys = ["id", "name"];
    const result = formatData(testData, listOfKeys);
    expect(result).not.toBe(testData);
  });
  test("should not mutate array", () => {
    const testData = [
      {
        id: 148,
        name: "pippa",
        hat: true,
      },
      {
        id: 147,
        name: "katherine",
        hat: false,
      },
    ];
    const testDataTwin = [
      {
        id: 148,
        name: "pippa",
        hat: true,
      },
      {
        id: 147,
        name: "katherine",
        hat: false,
      },
    ];
    const listOfKeys = ["id", "name"];
    formatData(testData, listOfKeys);
    expect(testData).toEqual(testDataTwin);
  });
});

describe("createLookupTable", () => {
  test("returns empty object when given no data", () => {
    expect(createLookupTable([])).toEqual({});
  });
  test("returns lookup table when given data", () => {
    const data = [
      { type_id: 1, type: "grass" },
      { type_id: 2, type: "poison" },
      { type_id: 3, type: "fire" },
    ];
    const expected = { grass: 1, poison: 2, fire: 3 };
    expect(createLookupTable(data)).toEqual(expected);
  });
  test("should not mutate the input array", () => {
    const data = [
      { type_id: 1, type: "grass" },
      { type_id: 2, type: "poison" },
      { type_id: 3, type: "fire" },
    ];
    const dataTwin = [
      { type_id: 1, type: "grass" },
      { type_id: 2, type: "poison" },
      { type_id: 3, type: "fire" },
    ];
    createLookupTable(data);
    expect(data).toEqual(dataTwin);
  });
});

describe("findNewUniqueValues", () => {
  test("should only return the unique values comparing the old moves and the new moves from pokemon", () => {
    const newValues = ["dragon", "fish", "blue", "green"];
    const oldValues = ["dragon", "green", "yellow", "purple"];
    const expected = ["fish", "blue"];
    expect(findNewUniqueValues(oldValues, newValues)).toEqual(expected);
  });
  test("test with ids ", () => {
    const newValues = [1, 2, 3];
    const oldValues = [2, 3, 4];
    const expected = [1];
    expect(findNewUniqueValues(oldValues, newValues)).toEqual(expected);
  });
  test("shoudlnt mutate the old array", () => {
    const oldArray = [1, 2, 3];
    const oldArrayTwin = [1, 2, 3];
    const newArray = [2, 3, 4];
    findNewUniqueValues(oldArray, newArray);
    expect(oldArray).toEqual(oldArrayTwin);
  });
  test("shoudlnt mutate the new array", () => {
    const newArray = [1, 2, 3];
    const newArrayTwin = [1, 2, 3];
    const oldArray = [2, 3, 4];
    findNewUniqueValues(oldArray, newArray);
    expect(newArray).toEqual(newArrayTwin);
  });
  test("should return a new array", () => {
    const newValues = [1, 2, 3];
    const oldValues = [2, 3, 4];
    const output = findNewUniqueValues(oldValues, newValues);
    expect(output).not.toBe(newValues);
    expect(output).not.toBe(oldValues);
  });
});

describe("formatMoveIdArray", () => {
  test("should return single value array when passed pokedata with single move", () => {
    const pokeData = {
      moves: [{ move: { url: "https://pokeapi.co/api/v2/move/1/" } }],
    };
    expect(formatMoveIdArray(pokeData)).toEqual([1]);
  });
  test("should return multiple value array when passed pokedata with multiple moves", () => {
    const pokeData = {
      moves: [
        { move: { url: "https://pokeapi.co/api/v2/move/1/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/4/" } },
        { move: { url: "https://pokeapi.co/api/v2/move/5/" } },
      ],
    };
    expect(formatMoveIdArray(pokeData)).toEqual([1, 4, 5]);
  });
});
