import { readFileSync } from "fs";
import { createGrid } from "utils/grid";
import { expect } from "utils/test";

const grid = createGrid(
  readFileSync("./day7.input.txt", "utf-8")
);

let currentRowLines: number[] = [grid[0].indexOf("S")];
let nextRowLines: number[] = [];
let splitAmounts = 0;

grid.slice(1).forEach((row) => {
  nextRowLines = [];
  currentRowLines.forEach((colIndex) => {
    if (row[colIndex] === "^") {
      nextRowLines.push(colIndex - 1, colIndex + 1);
      splitAmounts += 1;
    } else if (row[colIndex] === ".") {
      nextRowLines.push(colIndex);
    }
  });
  currentRowLines = [...new Set(nextRowLines)];
});

expect(splitAmounts).toBe(1649);
