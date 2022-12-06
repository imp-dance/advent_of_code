const { data } = require("./data/day-6");

const part1 = () => {
  const memory = [];
  let res = "";

  data.split("").forEach((char, i) => {
    if (memory.length === 4) {
      memory.shift();
    }
    memory.push(char);
    if (
      memory.length === 4 &&
      !memory.some(
        (item) => memory.filter((i) => i === item).length > 1
      ) &&
      res === ""
    ) {
      res = i;
    }
  });
  return res + 1;
};

const part2 = () => {
  const memory = [];
  let res = 0;

  data.split("").forEach((char, i) => {
    if (memory.length === 14) {
      memory.shift();
    }
    memory.push(char);
    if (
      memory.length === 14 &&
      !memory.some(
        (item) => memory.filter((i) => i === item).length > 1
      ) &&
      res === 0
    ) {
      res = i;
    }
  });
  return res + 1;
};

console.log(part1());
console.log(part2());
