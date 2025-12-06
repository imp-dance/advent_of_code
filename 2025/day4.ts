import { readFileSync } from "fs";
import {
  copyGrid,
  createGrid,
  gridAt,
  lookAround,
  Pointer,
} from "../utils/grid";

const input = readFileSync("./day4.input.txt", "utf8");

const grid = createGrid(input);

const PAPER_ROLL = "@";

const state = {
  pointer: [0, 0] as Pointer,
};

function part1() {
  let accessibleAmount = 0;
  grid.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (gridAt([rowIndex, colIndex], grid) !== PAPER_ROLL) {
        return;
      }
      const sides = lookAround([rowIndex, colIndex], grid);
      const diagonals = [
        gridAt([rowIndex - 1, colIndex + 1], grid),
        gridAt([rowIndex - 1, colIndex - 1], grid),
        gridAt([rowIndex + 1, colIndex + 1], grid),
        gridAt([rowIndex + 1, colIndex - 1], grid),
      ];

      const canBeAccessed =
        [...sides.values, ...diagonals].reduce((acc, value) => {
          if (value === "@") {
            return acc + 1;
          }
          return acc;
        }, 0) < 4;

      if (canBeAccessed) {
        accessibleAmount++;
      }
    });
  });
  return accessibleAmount;
}

function part2() {
  let accessibleAmount = 0;
  let lastAccessibleAmount = -1;
  let intermediate = 0;
  const gridAccumulator = copyGrid(grid);

  while (lastAccessibleAmount !== accessibleAmount) {
    gridAccumulator.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col !== PAPER_ROLL) {
          return;
        }
        const sides = lookAround(
          [rowIndex, colIndex],
          gridAccumulator
        );
        const diagonals = [
          gridAt([rowIndex - 1, colIndex + 1], gridAccumulator),
          gridAt([rowIndex - 1, colIndex - 1], gridAccumulator),
          gridAt([rowIndex + 1, colIndex + 1], gridAccumulator),
          gridAt([rowIndex + 1, colIndex - 1], gridAccumulator),
        ];

        const canBeAccessed =
          [...sides.values, ...diagonals].reduce(
            (acc, value) => {
              if (value === "@") {
                return acc + 1;
              }
              return acc;
            },
            0
          ) < 4;

        if (canBeAccessed) {
          accessibleAmount++;
          gridAccumulator[rowIndex][colIndex] = ".";
        }
      });
    });
    lastAccessibleAmount = intermediate;
    intermediate = accessibleAmount;
  }
  return accessibleAmount;
}

console.log({
  part1: part1(),
  part2: part2(),
});
