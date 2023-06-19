const { collectPokemonData } = require("../utils");

describe("collectAllPokemonData", () => {
  test("should return an array", () => {
    return collectPokemonData(151).then((pokemon) => {
      expect(Array.isArray(pokemon)).toBe(true);
    });
  });
  test("check the length of the array is the same as the argument passed in", () => {
    return collectPokemonData(151).then((pokemon) => {
      expect(pokemon.length).toBe(151);
    });
  });
});
