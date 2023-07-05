const {
  fetchSinglePokemonData,
  fetchMoveByMoveId,
  getNumberOfPokemon,
} = require("../api");

describe("fetchSinglePokemonData", () => {
  test("returns an object", () => {
    const output = fetchSinglePokemonData(1);
    expect(typeof output).toBe("object");
    expect(Array.isArray(output)).toBe(false);
  });
  test("returned object has the correct properties", () => {
    return fetchSinglePokemonData(1).then((pokemon) => {
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
