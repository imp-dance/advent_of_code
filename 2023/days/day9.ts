import { getLines } from "../utils/utils.js";

const lines = getLines("./day9.input.txt");

const histories = lines.map((line) =>
  line.split(" ").map((v) => parseInt(v))
);

const levels = histories.map((history) => {
  const topLevel = history;
  const allLevels = [topLevel];

  function createRoots() {
    // generates the roots of the sequence
    while (
      !allLevels[allLevels.length - 1].every((v) => v === 0)
    ) {
      const papa = allLevels[allLevels.length - 1];
      const nextLevel: number[] = [];
      papa.forEach((kid, i) => {
        if (i > 0) {
          const a = kid;
          const b = papa[i - 1];
          nextLevel.push(a - b);
        }
      });
      allLevels.push(nextLevel);
    }
  }

  function addEntryToEnd() {
    // adds one more entry to end of sequence
    for (let i = allLevels.length - 1; i > -1; i--) {
      if (i === allLevels.length - 1) {
        // bottom, add zero
        allLevels[i].push(0);
      } else {
        const currentLevel = allLevels[i];
        const lastEntry = currentLevel[currentLevel.length - 1];
        const levelBelow = allLevels[i + 1];
        const lastEntryBelow = levelBelow[levelBelow.length - 1];
        currentLevel.push(lastEntry + lastEntryBelow);
      }
    }
  }

  function addEntryToStart() {
    // adds one more entry to end of sequence
    for (let i = allLevels.length - 1; i > -1; i--) {
      if (i === allLevels.length - 1) {
        // bottom, add zero
        allLevels[i].unshift(0);
      } else {
        const currentLevel = allLevels[i];
        const lastEntry = currentLevel[0];
        const levelBelow = allLevels[i + 1];
        const lastEntryBelow = levelBelow[0];
        currentLevel.unshift(lastEntry - lastEntryBelow);
      }
    }
  }

  createRoots();
  addEntryToEnd();
  addEntryToStart();
  return allLevels;
});

console.log(levels[0]);

function part1() {
  return levels
    .map((level) => level[0][level[0].length - 1])
    .reduce((acc, item) => acc + item, 0);
}

function part2() {
  return levels
    .map((level) => level[0][0])
    .reduce((acc, item) => acc + item, 0);
}

console.log({
  part1: part1(),
  part2: part2(),
});
