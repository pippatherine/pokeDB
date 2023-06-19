const {
  collectPokemonData,
  collectMoveData,
  formatPokemonData,
} = require("../utils");

describe("collectAllPokemonData", () => {
  test("should return an array", () => {
    return collectPokemonData(20).then((pokemon) => {
      expect(Array.isArray(pokemon)).toBe(true);
    });
  });
  test("check the length of the array and shape of the object", () => {
    return collectPokemonData(20).then((pokemon) => {
      expect(pokemon.length).toBe(20);
      pokemon.forEach((aPokemon) => {
        expect(aPokemon).toMatchObject({
          id: expect.any(Number),
          name: expect.any(String),
          weight: expect.any(Number),
          height: expect.any(Number),
          types: expect.any(Array),
          moveIds: expect.any(Array),
          sprite: expect.any(String),
        });
      });
    });
  });
});

describe("collectMoveData", () => {
  test("should return an array", () => {
    const moveIdArray = [1, 2];
    return collectMoveData(moveIdArray).then((moves) => {
      expect(moves).toBeInstanceOf(Array);
    });
  });
  test("should return move objects when given an array of IDs", () => {
    const moveIdArray = [1, 2, 3];
    return collectMoveData(moveIdArray).then((moves) => {
      expect(moves.length).toBe(moveIdArray.length);
      moves.forEach((move) => {
        expect(move).toMatchObject({
          name: expect.any(String),
          pp: expect.any(Number),
          power: expect.any(Number),
          description: expect.any(String),
        });
      });
    });
  });
});

describe("formatPokemonData", () => {
  test("expect an Array of Arrays", () => {
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
    const result = formatPokemonData(pokemonData);
    expect(result).toHaveLength(pokemonData.length);
    expect(result).toBeInstanceOf(Array);
    result.forEach((aPokemon) => {
      expect(aPokemon).toBeInstanceOf(Array);
    });
  });
  test("when passed single pokemon data should return data in array of arrays format", () => {
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
    const result = formatPokemonData(pokemonData);
    expect(result).toEqual([[147, "dratini", 33, 18, pokemonData[0].sprite]]);
  });
  test("when passed multiple pokemon data should return data in array of arrays format", () => {
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
    ];
    const expected = [
      [
        pokemonData[0].id,
        pokemonData[0].name,
        pokemonData[0].weight,
        pokemonData[0].height,
        pokemonData[0].sprite,
      ],
      [
        pokemonData[1].id,
        pokemonData[1].name,
        pokemonData[1].weight,
        pokemonData[1].height,
        pokemonData[1].sprite,
      ],
    ];
    const result = formatPokemonData(pokemonData);
    expect(result).toEqual(expected);
  });
  test("should return a new array", () => {
    const input = [];
    const output = formatPokemonData(input);
    expect(input).not.toBe(output);
  });
  test("should not mutate input array", () => {
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
        id: 148,
        name: "dragonair",
        weight: 165,
        height: 40,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png",
        types: ["dragon"],
        moveIds: [20, 21],
      },
    ];
    formatPokemonData(pokemonData);
    expect(pokemonData).toEqual(pokemonDataTwin);
  });
});
