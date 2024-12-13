import fs from "fs";
import { findPairs } from "../utils/array";
import { moveUntilOob, withinBounds } from "../utils/grid";

const input = fs.readFileSync("./day8.input.txt", "utf-8");
let grid: string[][];
const resetGrid = () => {
  grid = input
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split("").filter(Boolean));
};
resetGrid();
const freqMatcher = /(\d)|([A-Z])|([a-z])/;

const frequencies = findAllFrequencies();

function part1() {
  const findAntinodes = (frequency: string) => {
    const positions = frequencies[frequency];
    if (!positions)
      throw new Error("Frequency not found: " + frequency);
    const pairs = findPairs(positions);
    const antiNodePositions: [number, number][] = [];
    pairs.forEach(([a, b], i) => {
      const [aRow, aCol] = a;
      const [bRow, bCol] = b;
      const rowDiff =
        Math.max(aRow, bRow) - Math.min(aRow, bRow);
      const colDiff =
        Math.max(aCol, bCol) - Math.min(aCol, bCol);
      const xDir = aCol > bCol ? "left" : "right";
      if (rowDiff === 0) {
        if (xDir === "left") {
          // left of b
          antiNodePositions.push([aRow, bCol - colDiff]);
          // right of a
          antiNodePositions.push([aRow, aCol + colDiff]);
        } else {
          // right of b
          antiNodePositions.push([aRow, bCol + colDiff]);
          // left of a
          antiNodePositions.push([aRow, aCol - colDiff]);
        }
      } else {
        // add to up and down in `xDir`
        if (xDir === "left") {
          // top right of a
          antiNodePositions.push([
            aRow - rowDiff,
            aCol + colDiff,
          ]);
          // bottom left of b
          antiNodePositions.push([
            bRow + rowDiff,
            bCol - colDiff,
          ]);
        } else {
          // top left of a
          antiNodePositions.push([
            aRow - rowDiff,
            aCol - colDiff,
          ]);
          // bottom right of b
          antiNodePositions.push([
            bRow + rowDiff,
            bCol + colDiff,
          ]);
        }
      }
    });
    return antiNodePositions.filter((i) =>
      withinBounds(i, grid)
    );
  };

  const allFreq = Object.keys(frequencies);
  allFreq.forEach((frequencySymbol) => {
    const antiNodes = findAntinodes(frequencySymbol);
    antiNodes.forEach((pos) => {
      grid[pos[0]][pos[1]] = "#";
    });
  });
  const drawing = drawMap();
  return (drawing.match(/\#/g) ?? []).length;
}

function part2() {
  const findAntinodes = (frequency: string) => {
    const positions = frequencies[frequency];
    if (!positions)
      throw new Error("Frequency not found: " + frequency);
    const pairs = findPairs(positions);
    const antiNodePositions: [number, number][] = [];
    pairs.forEach(([a, b], i) => {
      const [aRow, aCol] = a;
      const [bRow, bCol] = b;
      const rowDiff =
        Math.max(aRow, bRow) - Math.min(aRow, bRow);
      const colDiff =
        Math.max(aCol, bCol) - Math.min(aCol, bCol);
      const xDir = aCol > bCol ? "left" : "right";
      antiNodePositions.push(a, b);
      if (rowDiff === 0) {
        if (xDir === "left") {
          // left of b
          antiNodePositions.push(
            ...moveUntilOob(
              [bRow, bCol],
              (r) => r,
              (c) => c - colDiff,
              grid
            )
          );
          // right of a
          antiNodePositions.push(
            ...moveUntilOob(
              [aRow, aCol],
              (r) => r,
              (c) => c + colDiff,
              grid
            )
          );
        } else {
          // right of b
          antiNodePositions.push(
            ...moveUntilOob(
              [bRow, bCol],
              (r) => r,
              (c) => c + colDiff,
              grid
            )
          );
          // left of a
          antiNodePositions.push(
            ...moveUntilOob(
              [aRow, aCol],
              (r) => r,
              (c) => c - colDiff,
              grid
            )
          );
        }
      } else {
        // add to up and down in `xDir`
        if (xDir === "left") {
          // top right of a
          antiNodePositions.push(
            ...moveUntilOob(
              [aRow, aCol],
              (r) => r - rowDiff,
              (c) => c + colDiff,
              grid
            )
          );
          // bottom left of b
          antiNodePositions.push(
            ...moveUntilOob(
              [bRow, bCol],
              (r) => r + rowDiff,
              (c) => c - colDiff,
              grid
            )
          );
        } else {
          // top left of a
          antiNodePositions.push(
            ...moveUntilOob(
              [aRow, aCol],
              (r) => r - rowDiff,
              (c) => c - colDiff,
              grid
            )
          );
          // bottom right of b
          antiNodePositions.push(
            ...moveUntilOob(
              [bRow, bCol],
              (r) => r + rowDiff,
              (c) => c + colDiff,
              grid
            )
          );
        }
      }
    });
    return antiNodePositions.filter((i) =>
      withinBounds(i, grid)
    );
  };

  const allFreq = Object.keys(frequencies);

  allFreq.forEach((frequencySymbol) => {
    const antiNodes = findAntinodes(frequencySymbol);
    antiNodes.forEach((pos) => {
      grid[pos[0]][pos[1]] = "#";
    });
  });
  const drawing = drawMap();
  return (drawing.match(/\#/g) ?? []).length;
}

console.log({
  part1: part1(),
});
console.log(drawMap());
resetGrid();

console.log({
  part2: part2(),
});
console.log(drawMap());

// helpers

function findAllFrequencies() {
  const positions: Record<string, Array<[number, number]>> = {};

  grid.forEach((cols, r) => {
    cols.forEach((point, c) => {
      if (Boolean(point.match(freqMatcher))) {
        if (positions[point]) {
          positions[point].push([r, c]);
        } else {
          positions[point] = [[r, c]];
        }
      }
    });
  });
  return positions;
}

function drawMap() {
  let drawing = "";
  grid.forEach((columns) => {
    columns.forEach((letter) => {
      drawing += letter;
    });
    drawing += "\n";
  });
  return drawing;
}
