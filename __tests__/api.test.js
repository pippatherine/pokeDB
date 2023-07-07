const {
  fetchSinglePokemonData,
  fetchMoveByMoveId,
  getNumberOfPokemon,
} = require("../api");

class MockObject {
  constructor() {
    this.pokemon1 = {
      data: {
        moves: [
          { move: { url: "https://pokeapi.co/api/v2/move/1/" } },
          { move: { url: "https://pokeapi.co/api/v2/move/4/" } },
          { move: { url: "https://pokeapi.co/api/v2/move/5/" } },
        ],
        types: [
          { type: { name: "type1" } },
          { type: { name: "type2" } },
          { type: { name: "type3" } },
        ],
        weight: 2,
        height: 10,
        species: { name: "name1" },
        sprites: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/125.png",
        },
      },
    };
    this.pokemon2 = {
      data: {
        moves: [{ move: { url: "https://pokeapi.co/api/v2/move/1/" } }],
        types: [
          { type: { name: "type1" } },
          { type: { name: "type2" } },
          { type: { name: "type3" } },
        ],
        weight: 2,
        height: 10,
        species: { name: "species1" },
        sprites: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/125.png",
        },
      },
    };
    this.move1 = {
      data: {
        name: "name1",
        pp: 1,
        power: 10,
        id: 1,
        effect_entries: [{ effect: "effect text" }],
      },
    };
    this.move2 = {
      data: {
        name: "name2",
        pp: 1,
        power: 10,
        id: 2,
        effect_entries: [],
      },
    };
    this.count = {
      data: { count: 1010 },
    };
  }
  get(path) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        switch (path) {
          case "/pokemon/1":
            return resolve(this.pokemon1);
          case "/pokemon/2":
            return resolve(this.pokemon2);
          case "/move/1":
            return resolve(this.move1);
          case "/move/2":
            return resolve(this.move2);
          case "/pokemon-species/?limit=0":
            return resolve(this.count);
          default:
            break;
        }
      }, 1);
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
  test("returned object has the correct properties", () => {
    const mockApi = new MockObject();
    return fetchSinglePokemonData(1, mockApi).then((pokemon) => {
      expect(pokemon).toMatchObject({
        name: expect.any(String),
        height: expect.any(Number),
        weight: expect.any(Number),
        sprite: expect.any(String),
      });
    });
  });
  test("returned object should contain array of types", () => {
    const mockAPI = new MockObject();
    return fetchSinglePokemonData(1, mockAPI).then((pokemon) => {
      expect(pokemon.types).toEqual(["type1", "type2", "type3"]);
    });
  });
  test("return the correct amount of move ids ", () => {
    const mockAPI = new MockObject();
    return fetchSinglePokemonData(1, mockAPI).then((pokemon) => {
      expect(pokemon.moveIds).toHaveLength(3);
    });
  });
  test("returned object should contain an array with a single move id if the pokemon has one move (ditto)", () => {
    const mockAPI = new MockObject();
    return fetchSinglePokemonData(2, mockAPI).then((pokemon) => {
      expect(pokemon.moveIds).toEqual([1]);
    });
  });
  test("returned object should contain an array of move ids", () => {
    const mockAPI = new MockObject();
    return fetchSinglePokemonData(1, mockAPI).then((pokemon) => {
      expect(pokemon.moveIds).toEqual([1, 4, 5]);
    });
  });
});

describe("getMoveByMoveId", () => {
  test("should return an object", () => {
    const mockAPI = new MockObject();
    return fetchMoveByMoveId(1, mockAPI).then((move) => {
      expect(Array.isArray(move)).toBe(false);
      expect(typeof move).toBe("object");
    });
  });
  test("should return an object with correct keys", () => {
    const mockAPI = new MockObject();
    return fetchMoveByMoveId(1, mockAPI).then((move) => {
      expect(move).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        pp: expect.any(Number),
        power: expect.any(Number),
        description: expect.any(String),
      });
    });
  });
  test('if move has no effect text, replaces with "No description found"', () => {
    const mockAPI = new MockObject();
    return fetchMoveByMoveId(2, mockAPI).then((move) => {
      expect(move.description).toBe("No description found");
    });
  });
});

describe("getNumberOfPokemon", () => {
  test("should return correct number", () => {
    const mockAPI = new MockObject();
    return getNumberOfPokemon(mockAPI).then((number) => {
      expect(number).toBeGreaterThan(1009);
    });
  });
});
