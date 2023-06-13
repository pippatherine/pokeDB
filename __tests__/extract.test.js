const { fetchSinglePokemonData } = require("../api");

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
  describe("fetchMovebyID", () => {
    test("return the correct amount of move ids ", () => {
      return fetchSinglePokemonData(1).then((pokemon) => {
        expect(pokemon.moveIds).toHaveLength(83);
      });
    });
    test("returned object should contain an array of move ids", () => {
      return fetchSinglePokemonData(132).then((pokemon) => {
        expect(pokemon.moveIds).toEqual([144]);
      });
    });
  });
});
