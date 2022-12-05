const { data } = require("./data/day-5");

const lines = data.split("\n");
const crateLines = lines.slice(0, 10);
const moves = lines.slice(10);

const getCrates = () => {
  const crateBoxes = [];
  crateLines.forEach((crateLine) => {
    const points = crateLine.split("");
    let currentCrateIndex = 0;
    for (let i = 1; i <= points.length; i += 4) {
      if (crateBoxes[currentCrateIndex] === undefined) {
        crateBoxes[currentCrateIndex] = [];
      }
      const point = points[i];
      if (point !== " " && !isFinite(parseInt(point))) {
        crateBoxes[currentCrateIndex].push(points[i]);
      }
      currentCrateIndex++;
    }
  });
  return crateBoxes;
};

const part1 = () => {
  const inventory = getCrates();
  moves.forEach((move) => {
    const [_m, moveCount, _f, origin, _t, destination] =
      move.split(" ");
    const moveStack = [];
    for (let i = 0; i < parseInt(moveCount); i++) {
      moveStack.push(inventory[parseInt(origin) - 1].shift());
    }
    moveStack.forEach((item) => {
      inventory[parseInt(destination) - 1].unshift(item);
    });
  });
  let res = "";
  inventory.forEach((stack) => {
    res += stack[0];
  });
  return res;
};

const part2 = () => {
  const inventory = getCrates();
  moves.forEach((move) => {
    const [_m, moveCount, _f, origin, _t, destination] =
      move.split(" ");
    const moveStack = [];
    for (let i = 0; i < parseInt(moveCount); i++) {
      moveStack.push(inventory[parseInt(origin) - 1].shift());
    }
    moveStack.reverse().forEach((item) => {
      inventory[parseInt(destination) - 1].unshift(item);
    });
  });
  let res = "";
  inventory.forEach((stack) => {
    res += stack[0];
  });
  return res;
};

console.log(part1());
console.log(part2());
