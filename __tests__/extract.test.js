const { fetchSinglePokemonData } = require("../api");

describe("fetchSinglePokemonData", () => {
  test("returns an object", () => {
    const output = fetchSinglePokemonData(1);
    expect(typeof output).toBe("object");
    expect(Array.isArray(output)).toBe(false);
  });
});
