import { readFileSync } from "fs";
import { expect } from "utils/test";

const input = readFileSync("./day9.input.txt", "utf8");

type Tile = {
  col: number;
  row: number;
  id: number;
};

const store: Record<number, boolean[]> = {};

const activate = (tile: Omit<Tile, "id">) => {
  if (!store[tile.row]) {
    store[tile.row] = [];
  }
  store[tile.row][tile.col] = true;
};

const isActive = (tile: Omit<Tile, "id">) => {
  return store[tile.row]?.[tile.col] ? true : false;
};

let idAccumulator = 0;
const redTiles: Tile[] = parseInput();
const greenTiles: Tile[] = [];
connectCorners();
greenTiles.forEach((tile) => {
  // extend out in all directions we hit a coordinate that is not activated
  // store only the last in each direction
  // try to circle the largest area
  // if all are activated, calculate area and store the largest
});

console.log("walk:", walkHorizontal({ row: 1, col: 7 }));

const areaCache = new Map<string, number>();

const [largestArea] = [...areaCache.values()].sort(
  (a, b) => b - a
);

expect(largestArea).toBe(24);

function connectByRow(a: number, b: number, col: number) {
  const max = Math.max(a, b);
  const min = Math.min(a, b);
  for (let row = min + 1; row < max; row++) {
    addGreenTile({ row, col });
  }
}

function connectByCol(a: number, b: number, row: number) {
  const max = Math.max(a, b);
  const min = Math.min(a, b);
  for (let col = min + 1; col < max; col++) {
    addGreenTile({ row, col });
  }
}

function connectCorners() {
  redTiles.forEach((corner, i) => {
    if (i === redTiles.length - 1) {
      const first = redTiles[0];
      if (first.col === corner.col) {
        connectByRow(first.row, corner.row, first.col);
      } else if (corner.row === first.row) {
        connectByCol(first.col, corner.col, first.row);
      }
    }
    if (i > 0) {
      const last = redTiles[i - 1];

      if (last.col === corner.col) {
        connectByRow(corner.row, last.row, corner.col);
      } else if (last.row === corner.row) {
        connectByCol(corner.col, last.col, corner.row);
      }
    }
  });
}

function walkHorizontal(tile: Omit<Tile, "id">) {
  let i = tile.col;
  while (isActive({ row: tile.row, col: i })) {
    i += 1;
  }
  return i - 1;
}

function walkVertical(tile: Omit<Tile, "id">) {
  let i = tile.row;
  while (isActive({ col: tile.col, row: i })) {
    i += 1;
  }
  return i - 1;
}

function addGreenTile(arg: Omit<Tile, "id">) {
  idAccumulator++;
  greenTiles.push({ ...arg, id: idAccumulator });
  activate(arg);
}

function parseInput() {
  return input
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [col, row] = line
        .split(",")
        .map((v) => v.trim())
        .map((v) => parseInt(v));
      idAccumulator++;
      activate({ col, row });
      return {
        col: col,
        row: row,
        id: idAccumulator,
      };
    });
}
