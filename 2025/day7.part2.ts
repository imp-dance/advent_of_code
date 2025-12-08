import { readFileSync } from "fs";
import { createGrid } from "utils/grid";
import { expect } from "utils/test";

const grid = createGrid(
  readFileSync("./day7.input.txt", "utf-8")
);

let currentRowLines: number[] = [grid[0].indexOf("S")];
let nextRowLines: number[] = [];
let splitAmounts = 0;
const allRowLines: number[][] = [[grid[0].indexOf("S")]];

grid.slice(1).forEach((row, i) => {
  nextRowLines = [];
  currentRowLines.forEach((colIndex) => {
    if (row[colIndex] === "^") {
      nextRowLines.push(colIndex - 1, colIndex + 1);
      splitAmounts += 1;
    } else if (row[colIndex] === ".") {
      nextRowLines.push(colIndex);
    }
  });
  allRowLines[i + 1] = nextRowLines;
  currentRowLines = [...new Set(nextRowLines)];
});

const canComeFrom = (rowIndex: number, colIndex: number) => {
  let canKeepGoing = true;
  let currentRowIndex = rowIndex;
  const canComeFrom: [number, number][] = [];
  while (canKeepGoing) {
    currentRowIndex--;
    const isAboveGrid =
      allRowLines[currentRowIndex] === undefined;
    if (isAboveGrid) {
      canKeepGoing = false;
      break;
    }
    const hitSplit = grid[currentRowIndex][colIndex] === "^";
    if (hitSplit) {
      // hit a "^", we have exhausted all options
      canKeepGoing = false;
    }
    if (
      colIndex !== 0 &&
      grid[currentRowIndex][colIndex - 1] === "^"
    ) {
      canComeFrom.push([currentRowIndex, colIndex - 1]);
    }
    if (
      colIndex !== grid[currentRowIndex].length - 1 &&
      grid[currentRowIndex][colIndex + 1] === "^"
    ) {
      canComeFrom.push([currentRowIndex, colIndex + 1]);
    }
  }
  return canComeFrom;
};

const amountGrid: number[][] = [];

grid.forEach((row, i) => {
  amountGrid.push([]);
  const currentGridRow = amountGrid[i];
  row.forEach((column, ci) => {
    if (allRowLines[i].includes(ci)) {
      const allSpots = canComeFrom(i, ci).length || 1;
      currentGridRow.push(allSpots);
    } else {
      currentGridRow.push(0);
    }
  });
});

const stepGrid = amountGrid.map((row, i) =>
  row.map((n, ci) =>
    n ? (i === 0 ? "S" : "|") : grid[i][ci] === "^" ? "^" : " "
  )
);

console.log(stepGrid.map((r) => r.join("")).join("\n"));

function recursivelyGetAmountOfParents(
  rowIndex: number,
  colIndex: number
) {
  if (rowIndex === 1 && colIndex === 7) {
    return 1;
  }
  let amountOfParents = 0;
  const value = stepGrid[rowIndex][colIndex];

  switch (value) {
    case "|":
      const comesFrom = canComeFrom(rowIndex, colIndex);
      comesFrom.forEach(([r, c]) => {
        amountOfParents += recursivelyGetAmountOfParents(r, c);
      });
      break;
    case "^":
      amountOfParents += recursivelyGetAmountOfParents(
        rowIndex - 1,
        colIndex
      );
      break;
    case "S":
      amountOfParents += 1;
      break;
  }
  return amountOfParents;
}

const sum = stepGrid[grid.length - 1].reduce(
  (acc, col, index) => {
    const parentAmount = recursivelyGetAmountOfParents(
      stepGrid.length - 1,
      index
    );
    return acc + parentAmount;
  },
  0
);

console.log(recursivelyGetAmountOfParents(grid.length - 1, 2));

expect(sum).toBe(40);
