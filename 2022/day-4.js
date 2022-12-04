const { data } = require("./data/day-4");

const lines = data.split("\n");

const getNumsFromPair = (pair) => {
  // "1-4" => [1, 2, 3, 4]
  const [start, end] = pair
    .split("-")
    .map((num) => parseInt(num));
  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
};

const part1 = () => {
  const state = {
    containedWithinCount: 0,
  };
  lines.forEach((line) => {
    const pair = line.split(",");
    const pair1 = getNumsFromPair(pair[0]);
    const pair2 = getNumsFromPair(pair[1]);
    if (
      pair1.every((item) => pair2.includes(item)) ||
      pair2.every((item) => pair1.includes(item))
    ) {
      state.containedWithinCount++;
    }
  });

  return state.containedWithinCount;
};

const part2 = () => {
  const state = {
    overlappingPairs: 0,
  };
  lines.forEach((line) => {
    const pair = line.split(",");
    const pair1 = getNumsFromPair(pair[0]);
    const pair2 = getNumsFromPair(pair[1]);
    if (
      pair1.some((item) => pair2.includes(item)) ||
      pair2.some((item) => pair1.includes(item))
    ) {
      state.overlappingPairs++;
    }
  });
  return state.overlappingPairs;
};

console.log(part1());
console.log(part2());
