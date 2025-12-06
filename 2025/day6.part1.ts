import { readFileSync } from "fs";

const input = readFileSync("./day6.input.txt", "utf-8");

const lines = input.split("\n");

const data = lines.reduce(
  (acc, line, index) => {
    const isLastLine = index === lines.length - 1;
    if (isLastLine) {
      const operators = line.split(" ").filter(Boolean);
      acc.operators = operators as ("*" | "+")[];
    } else {
      const nums = line
        .split(" ")
        .filter(Boolean)
        .map((n) => parseInt(n));
      nums.forEach((num, index) => {
        if (acc.calculations[index]) {
          acc.calculations[index].push(num);
        } else {
          acc.calculations[index] = [num];
        }
      });
    }
    return acc;
  },
  {
    calculations: [] as number[][],
    operators: [] as ("*" | "+")[],
  }
);

const operations = {
  "*": multiply,
  "+": add,
};

const runOperation = (nums: number[], operator: "+" | "*") => {
  return operations[operator](...nums);
};

const part1 = () => {
  const sum = data.calculations.reduce((acc, nums, index) => {
    const result = runOperation(nums, data.operators[index]);
    console.log(nums.join(data.operators[index]), result);
    acc += result;
    return acc;
  }, 0);

  return sum;
};

console.log({
  part1: part1(),
});

function add(...nums: number[]) {
  return nums.reduce((acc, num) => acc + num, 0);
}

function multiply(...nums: number[]) {
  return nums.reduce(
    (acc, num) => (acc === Infinity ? 1 : acc) * num,
    Infinity
  );
}
