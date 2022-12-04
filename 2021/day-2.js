const { data } = require("./data/day-2");

const pos = {
  horizontal: 0,
  depth: 0,
  aim: 0,
};

const actions = {
  forward: (n) => (pos.horizontal += n),
  up: (n) => (pos.depth -= n),
  down: (n) => (pos.depth += n),
};

const instructions = data.split("\n").map((line) => {
  const [action, n] = line.split(" ");
  return [action, parseInt(n)];
});

const reset = () => {
  pos.horizontal = 0;
  pos.depth = 0;
  pos.aim = 0;
};

const part1 = () => {
  reset();
  instructions.forEach(([action, arg]) => actions[action](arg));
  return pos.horizontal * pos.depth;
};

console.log(part1());

const actions2 = {
  forward: (n) => {
    pos.horizontal += n;
    pos.depth += pos.aim * n;
  },
  down: (n) => (pos.aim += n),
  up: (n) => (pos.aim -= n),
};

const part2 = () => {
  reset();
  instructions.forEach(([action, arg]) => actions2[action](arg));
  return pos.horizontal * pos.depth;
};

console.log(part2());
