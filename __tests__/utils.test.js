const { collectPokemonData, collectMoveData } = require("../utils");

describe("collectAllPokemonData", () => {
  test("should return an array", () => {
    return collectPokemonData(151).then((pokemon) => {
      expect(Array.isArray(pokemon)).toBe(true);
    });
  });
  test("check the length of the array and shape of the object", () => {
    return collectPokemonData(151).then((pokemon) => {
      expect(pokemon.length).toBe(151);
      pokemon.forEach((aPokemon) => {
        expect(aPokemon).toMatchObject({
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
