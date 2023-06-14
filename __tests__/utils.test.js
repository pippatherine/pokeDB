const { collectPokemonData } = require("../utils");

describe("collectAllPokemonData", () => {
  test("should return an array", () => {
    return collectPokemonData().then((pokemon) => {
      expect(Array.isArray(pokemon)).toBe(true);
    });
  });
});
