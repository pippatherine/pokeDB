const { fetchSinglePokemonData } = require("../api");

describe("fetchSinglePokemonData", () => {
  test("returns an object", () => {
    const output = fetchSinglePokemonData(1);
    expect(typeof output).toBe("object");
    expect(Array.isArray(output)).toBe(false);
  });
  test("returned object has the correct properties", () => {
    const output = fetchSinglePokemonData(1);
    expect(output).objectContaining({
      name: expect.any(String),
      height: expect.any(Number),
      weight: expect.any(Number),
      sprite: expect.any(String),
      moves: expect.any(Array),
      types: expect.any(Array),
    });
  });
});
