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
  if (letter === "A") {
    if (search(currentY, currentX)) {
      matches += 1;
    }
  }
}

console.log(matches);

function search(y: number, x: number) {
  const match =
    ["SAM", "MAS"].includes(
      `${grid[y - 1]?.[x - 1]}${grid[y]?.[x]}${
        grid[y + 1]?.[x + 1]
      }`
    ) &&
    ["SAM", "MAS"].includes(
      `${grid[y - 1]?.[x + 1]}${grid[y]?.[x]}${
        grid[y + 1]?.[x - 1]
      }`
    );
  return match;
}
