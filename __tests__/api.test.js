const {
  fetchSinglePokemonData,
  fetchMoveByMoveId,
  getNumberOfPokemon,
} = require("../api");

class MockObject {
  constructor() {
    this.pokemonObject = {
      data: {
        moves: [
          { move: { url: "1https://pokeapi.co/api/v2/move/1/" } },
          { move: { url: "https://pokeapi.co/api/v2/move/4/" } },
          { move: { url: "https://pokeapi.co/api/v2/move/5/" } },
        ],
        types: [
          { type: { name: "evie" } },
          { type: { name: "millie" } },
          { type: { name: "katherine" } },
        ],
        weight: 2,
        height: 10,
        species: { name: "hev" },
        sprites: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/125.png",
        },
      },
    };
  }
  get(path) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(this.pokemonObject);
      }, 2000);
    });
    return promise;
  }
}
describe("fetchSinglePokemonData", () => {
  test("returns an object", () => {
    const mockApi = new MockObject();
    const output = fetchSinglePokemonData(1, mockApi);

    expect(typeof output).toBe("object");
    expect(Array.isArray(output)).toBe(false);
  });
  test.only("returned object has the correct properties", () => {
    const mockApi = new MockObject();

    return fetchSinglePokemonData(1, mockApi).then((pokemon) => {
      console.log(pokemon);
      expect(pokemon).toMatchObject({
        name: expect.any(String),
        height: expect.any(Number),
        weight: expect.any(Number),
        sprite: expect.any(String),
      });
    });
  });
  test("returned object should contain array of types", () => {
    return fetchSinglePokemonData(1).then((pokemon) => {
      expect(pokemon.types).toEqual(["grass", "poison"]);
    });
  });
  test("return the correct amount of move ids ", () => {
    return fetchSinglePokemonData(1).then((pokemon) => {
      expect(pokemon.moveIds).toHaveLength(83);
    });
  });
  test("returned object should contain an array with a single move id if the pokemon has one move (ditto)", () => {
    return fetchSinglePokemonData(132).then((pokemon) => {
      expect(pokemon.moveIds).toEqual([144]);
    });
  });
  test("returned object should contain an array of move ids", () => {
    return fetchSinglePokemonData(11).then((pokemon) => {
      expect(pokemon.moveIds).toEqual([81, 106, 334, 450, 527]);
    });
  });
});

describe("getMoveByMoveId", () => {
  test("should return an object", () => {
    return fetchMoveByMoveId(1).then((move) => {
      expect(Array.isArray(move)).toBe(false);
      expect(typeof move).toBe("object");
    });
  });
  test("should return an object with correct keys", () => {
    return fetchMoveByMoveId(1).then((move) => {
      expect(move).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        pp: expect.any(Number),
        power: expect.any(Number),
        description: expect.any(String),
      });
    });
  });
  test('if move has no flavour text, replaces with "No description found"', () => {
    return fetchMoveByMoveId(851).then((move) => {
      expect(move.description).toBe("No description found");
    });
  });
});

describe("getNumberOfPokemon", () => {
  test("should return correct number", () => {
    return getNumberOfPokemon().then((number) => {
      console.log(number);
      expect(number).toBeGreaterThan(1009);
    });
  });
});
