import fs from "fs";

const testData = fs.readFileSync("./day4.input.txt", "utf8");
const grid = testData.split("\n").filter(Boolean);

const regexSearch = /(XMAS)|(SAMX)/g;
const horizontalLength = grid[0].length;
const verticalLength = grid.length;

function getNextVertical(i: number, line: number) {
  return grid[i]?.[line] ?? false;
}

function getNextHorizontal(i: number, line: number) {
  return grid[line]?.[i] ?? false;
}

function getNextLrDiagonal(
  currentDiagonalLr: number,
  diagonalStateLr: [number, number],
  diagonals: string[][],
  i: number
) {
  const potentialNext = [
    diagonalStateLr[0] - 1,
    diagonalStateLr[1] + 1,
  ] as [number, number];
  if (
    potentialNext[0] < 0 ||
    potentialNext[1] > horizontalLength - 1
  ) {
    currentDiagonalLr += 1;
    diagonals.push([]); // add new list of patterns
    if (currentDiagonalLr > verticalLength - 1) {
      // now we are moving along the bottom row
      diagonalStateLr = [
        verticalLength - 1,
        currentDiagonalLr % (verticalLength - 1),
      ];
    } else {
      // now are are moving along the left column
      diagonalStateLr = [currentDiagonalLr, 0];
    }
  } else {
    diagonalStateLr = potentialNext;
  }
  if (i + 1 >= horizontalLength * verticalLength) {
    diagonals
      .at(-1)
      ?.push(grid[verticalLength - 1][horizontalLength - 1]);
  } else {
    diagonals
      .at(-1)
      ?.push(grid[diagonalStateLr[0]][diagonalStateLr[1]]);
  }
  return {
    diagonalStateLr,
    currentDiagonalLr,
  };
}

function getNextRlDiagonal(
  currentDiagonalRl: number,
  diagonalStateRl: [number, number],
  diagonals: string[][],
  i: number
) {
  const potentialNext = [
    diagonalStateRl[0] - 1,
    diagonalStateRl[1] - 1,
  ] as [number, number];
  if (
    potentialNext[0] < 0 ||
    potentialNext[1] > verticalLength - 1 ||
    potentialNext[1] < 0 ||
    potentialNext[0] > horizontalLength - 1
  ) {
    currentDiagonalRl += 1;
    diagonals.push([]); // add new list of patterns
    if (currentDiagonalRl > verticalLength - 1) {
      // now we are moving along the bottom row
      diagonalStateRl = [
        verticalLength - 1,
        horizontalLength -
          (currentDiagonalRl % (verticalLength - 1)),
      ];
    } else {
      // now are are moving along the right column
      diagonalStateRl = [currentDiagonalRl, verticalLength - 2];
    }
  } else {
    diagonalStateRl = potentialNext;
  }
  if (i + 1 >= horizontalLength * verticalLength) {
    diagonals.at(-1)?.push(grid[0][0]);
  } else {
    diagonals
      .at(-1)
      ?.push(grid[diagonalStateRl[0]][diagonalStateRl[1]]);
  }
  return { diagonalStateRl, currentDiagonalRl };
}

function part1() {
  const horizontalPattern: (string | false)[] = [];
  const verticalPattern: (string | false)[] = [];

  let currentDiagonalLr = -1;
  let diagonalStateLr: [number, number] = [0, 0];
  let currentDiagonalRl = -1;
  let diagonalStateRl: [number, number] = [
    0,
    horizontalLength - 1,
  ];
  let rlDiagonals: string[][] = [];
  let lrDiagonals: string[][] = [];
  for (let i = 0; i < horizontalLength * verticalLength; i++) {
    horizontalPattern.push(
      getNextHorizontal(
        i % horizontalLength,
        Math.floor(i / horizontalLength)
      )
    );
    verticalPattern.push(
      getNextVertical(
        i % verticalLength,
        Math.floor(i / verticalLength)
      )
    );
    const lrUpdates = getNextLrDiagonal(
      currentDiagonalLr,
      diagonalStateLr,
      lrDiagonals,
      i
    );
    currentDiagonalLr = lrUpdates.currentDiagonalLr;
    diagonalStateLr = lrUpdates.diagonalStateLr;
    const rlUpdates = getNextRlDiagonal(
      currentDiagonalRl,
      diagonalStateRl,
      rlDiagonals,
      i
    );
    currentDiagonalRl = rlUpdates.currentDiagonalRl;
    diagonalStateRl = rlUpdates.diagonalStateRl;
  }
  console.log([...lrDiagonals, ...rlDiagonals]);
  const horizontals = chunkUp(
    horizontalPattern.filter(Boolean) as string[],
    horizontalLength
  );
  const verticals = chunkUp(
    verticalPattern.filter(Boolean) as string[],
    verticalLength
  );
  let matches: string[] = [];
  // diagonal can be more than two
  [
    ...lrDiagonals,
    ...rlDiagonals,
    ...horizontals,
    ...verticals,
  ].forEach((pattern, i) => {
    const patternMatch = pattern.join("").match(regexSearch);
    if (patternMatch) matches.push(...patternMatch);
  });
  return matches.length;
}

console.log(part1());

function chunkUp<T>(arr: T[], size: number) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
