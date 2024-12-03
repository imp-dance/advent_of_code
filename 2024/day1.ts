import fs from "fs";

const input = fs.readFileSync("./day1.input.txt", "utf8");
const lines = input
  .split("\n")
  .map((line) => line.split(" ").filter(Boolean));

function sortAsc(a: number, b: number) {
  return a > b ? 1 : -1;
}

const firstList = lines
  .map((line) => parseInt(line[0], 10))
  .sort(sortAsc);
const secondList = lines
  .map((line) => parseInt(line[1], 10))
  .sort(sortAsc);

// part 1
const sum = firstList.reduce((acc, item, index) => {
  const first = item;
  const second = secondList[index];
  return acc + Math.max(first, second) - Math.min(first, second);
}, 0);
console.log({ part1: sum });

// part 2
const similarityScore = firstList.reduce((acc, item, index) => {
  const first = item;
  const appearances = secondList.filter(
    (i) => i === first
  ).length;
  return acc + first * appearances;
}, 0);

console.log({
  part2: similarityScore,
});
