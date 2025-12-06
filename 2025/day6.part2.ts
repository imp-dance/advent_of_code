import { readFileSync } from "fs";

const input = readFileSync("./day6.input.txt", "utf-8");

const lines = input.split("\n");

type Col = {
  numbers: number[];
  raw_numbers: string[];
  operator: "+" | "*";
  length: number;
  startIndex: number;
};

const data = lines.toReversed().reduce((acc, line, index) => {
  const isOnLastLine = index === 0;
  if (isOnLastLine) {
    const chars = line.split("");
    let currentLength = 0;
    let currentOperator = chars[0];
    let startIndex = 0;
    chars.forEach((char, i) => {
      const nextChar = chars[i + 1];
      if (
        ["*", "+"].includes(nextChar) ||
        i === chars.length - 1
      ) {
        currentLength += 1;
        if (i === chars.length - 1) {
          currentLength += 1;
        }

        acc.push({
          length: currentLength,
          numbers: [],
          raw_numbers: [],
          operator: currentOperator as "+",
          startIndex: startIndex,
        });
      } else if (["*", "+"].includes(char)) {
        currentLength = 0;
        currentOperator = char;
        startIndex = i;
      } else {
        currentLength += 1;
      }
    });
  } else {
    acc.forEach((col, i) => {
      const num = line.substring(
        col.startIndex,
        col.startIndex + col.length
      );
      col.raw_numbers.push(num);
    });
  }

  return acc;
}, [] as Col[]);

data.forEach((col) => {
  const numbers = [] as string[];
  col.raw_numbers.toReversed().forEach((rawNum, index) => {
    rawNum
      .split("")
      .toReversed()
      .forEach((char, ci) => {
        if (!numbers[ci]) {
          numbers[ci] = "";
        }
        numbers[ci] += char;
      });
  });
  col.numbers = numbers.map((n) => parseInt(n.trim()));
});

const operations = {
  "*": multiply,
  "+": add,
};

const runOperation = (nums: number[], operator: "+" | "*") => {
  return operations[operator](...nums);
};

const part2 = () => {
  return data.reduce(
    (acc, column) =>
      acc + runOperation(column.numbers, column.operator),
    0
  );
};

console.log({ part2: part2() });

function add(...nums: number[]) {
  return nums.reduce((acc, num) => acc + num, 0);
}

function multiply(...nums: number[]) {
  return nums.reduce(
    (acc, num) => (acc === Infinity ? 1 : acc) * num,
    Infinity
  );
}
