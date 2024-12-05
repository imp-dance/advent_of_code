import fs from "fs";
const testData = fs.readFileSync("./day4.input.txt", "utf8");
const grid = testData.split("\n").filter(Boolean);

const horizontalLength = grid[0].length;
const verticalLength = grid.length;

let matches = 0;
for (let i = 0; i < horizontalLength * verticalLength; i++) {
  const currentY = Math.floor(i / verticalLength);
  const currentX = i % verticalLength;
  const letter = grid[currentY][currentX];
  if (letter === "X") {
    const horiMatches = searchHorizontally(currentY, currentX);
    const diagMatches = searchDiagonally(currentY, currentX);
    matches += [
      horiMatches,
      searchVertically(currentY, currentX),
      diagMatches,
    ].reduce((acc, item) => acc + item, 0);
  }
}

console.log(matches);

function searchHorizontally(y: number, x: number): number {
  const texts = [
    `${grid[y]?.[x]}${grid[y]?.[x + 1]}${grid[y]?.[x + 2]}${
      grid[y]?.[x + 3]
    }`,
    `${grid[y]?.[x]}${grid[y]?.[x - 1]}${grid[y]?.[x - 2]}${
      grid[y]?.[x - 3]
    }`,
  ];
  return texts.filter(
    (item) => item === "XMAS" || item === "SAMX"
  ).length;
}

function searchVertically(y: number, x: number): number {
  return [
    `${grid[y]?.[x]}${grid[y + 1]?.[x]}${grid[y + 2]?.[x]}${
      grid[y + 3]?.[x]
    }`,
    `${grid[y]?.[x]}${grid[y - 1]?.[x]}${grid[y - 2]?.[x]}${
      grid[y - 3]?.[x]
    }`,
    `${grid[y]?.[x]}${grid[y - 1]?.[x + 1]}${
      grid[y - 2]?.[x + 2]
    }${grid[y - 3]?.[x + 3]}`,
    `${grid[y]?.[x]}${grid[y + 1]?.[x - 1]}${
      grid[y + 2]?.[x - 2]
    }${grid[y + 3]?.[x - 3]}`,
  ].filter((item) => item === "XMAS" || item === "SAMX").length;
}

function searchDiagonally(y: number, x: number): number {
  const diag = [
    `${grid[y]?.[x]}${grid[y + 1]?.[x + 1]}${
      grid[y + 2]?.[x + 2]
    }${grid[y + 3]?.[x + 3]}`,
    `${grid[y]?.[x]}${grid[y - 1]?.[x - 1]}${
      grid[y - 2]?.[x - 2]
    }${grid[y - 3]?.[x - 3]}`,
  ];
  return diag.filter(
    (item) => item === "XMAS" || item === "SAMX"
  ).length;
}
