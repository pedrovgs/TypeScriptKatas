export enum Cell {
  alive = "❤️",
  dead = "☠️",
}

export function evolve(cell: Cell, aliveNeighbours: number) {
  if (aliveNeighbours < 2 || aliveNeighbours > 3) {
    return Cell.dead;
  } else {
    if (cell === Cell.alive) {
      return Cell.alive;
    } else {
      return aliveNeighbours === 3 ? Cell.alive : Cell.dead;
    }
  }
}
