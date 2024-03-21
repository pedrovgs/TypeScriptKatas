import fc from "fast-check";
import { evolve, Cell } from "./gol";
describe("Cell requirementes", () => {

  it("alive with 2 survives", () => {
    expect(evolve(Cell.alive, 2)).toEqual(Cell.alive)
  });

  it("alive with 3 survives", () => {
    expect(evolve(Cell.alive, 3)).toEqual(Cell.alive)
  });

  it("dead with 3 survives", () => {
    expect(evolve(Cell.dead, 3)).toEqual(Cell.alive)
  });
  it("alive with 4 dies", () => {
    expect(evolve(Cell.alive, 4)).toEqual(Cell.dead)
  });
  it("alive with 5 dies", () => {
    expect(evolve(Cell.alive, 5)).toEqual(Cell.dead)
  });

});
describe("Cell properties", () => {
  
  it('every alive cell returns a dead cell if the number of alive neighbours is lower than 2', () => {
    fc.assert(
      fc.property(fc.integer().filter((n) => n < 2), (aliveNeighbours) => {
        return evolve(Cell.alive, aliveNeighbours) === Cell.dead
      })
    );
  });

   
  it('every alive cell returns a dead cell if the number of alive neighbours is greater than 3', () => {
    fc.assert(
      fc.property(fc.integer().filter((n) => n > 3), (aliveNeighbours) => {
        return evolve(Cell.alive, aliveNeighbours) === Cell.dead
      })
    );
  });

   
  it('every dead cell returns a dead cell if the number of alive neighbours is not 3', () => {
    fc.assert(
      fc.property(fc.integer().filter((n) => n != 3), (aliveNeighbours) => {
        return evolve(Cell.dead, aliveNeighbours) === Cell.dead
      })
    );
  });

   
  it('every dead cell returns a live cell if the number of alive neighbours is 3', () => {
    expect(evolve(Cell.dead, 3)).toEqual(Cell.alive)
  });


});
