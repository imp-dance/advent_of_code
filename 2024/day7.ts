import fs from "fs";

const input = fs.readFileSync("./day7.input.txt", "utf-8");

const mult = (a: number, b: number) => a * b;
const add = (a: number, b: number) => a + b;

const equations = input.split("\n").map((line) => ({
  sum: parseInt(line.split(":")[0].trim()),
  parts: line
    .split(":")[1]
    .split(" ")
    .filter(Boolean)
    .map((n) => parseInt(n.trim())),
}));

function part1() {
  const possible = equations.map(({ parts, sum }) => {
    const amountOfSymbols = parts.length - 1;

    const permutations = [
      ...new Set(
        generatePermutations(
          new Array(amountOfSymbols * 2)
            .fill("*", 0, amountOfSymbols)
            .fill("+", amountOfSymbols)
            .join("")
        ).map((str) => str.substring(0, amountOfSymbols))
      ),
    ];

    return permutations.map((v) => {
      const operands = v.split("");
      return {
        operands,
        parts,
        result: testEquation(parts, operands),
        expectedResult: sum,
      };
    });
  });
  return possible
    .filter((v) =>
      v.some((perm) => perm.expectedResult === perm.result)
    )
    .map((v) => {
      return v.find((p) => p.expectedResult === p.result);
    })
    .reduce((acc, item) => {
      acc += item?.result ?? 0;
      return acc;
    }, 0);
}

console.log(part1());

function swap(strArr: string[], i: number, j: number) {
  const temp = strArr[i];
  strArr[i] = strArr[j];
  strArr[j] = temp;
}

//iterative method
function generatePermutations(str: string) {
  const permutations = [];
  const factorial = (n: number): number =>
    n <= 1 ? 1 : n * factorial(n - 1);

  const len = str.length;
  const totalPermutations = factorial(len);

  for (let i = 0; i < totalPermutations; i++) {
    let currentPermutation = "";
    let temp = i;

    const availableChars = str.split("");

    for (let j = len - 1; j >= 0; j--) {
      const index = temp % (j + 1);
      temp = Math.floor(temp / (j + 1));

      currentPermutation += availableChars[index];
      availableChars.splice(index, 1);
    }

    permutations.push(currentPermutation);
  }

  return permutations;
}

// heaps algorythm
function generatePermutationsHeaps(
  str: string,
  n = str.length,
  strArr = str.split("")
) {
  const res: string[] = [];
  if (n === 1) {
    res.push(strArr.join(""));
  } else {
    for (let i = 0; i < n; i++) {
      const newRes = permute(str, n - 1, strArr);
      if (n % 2 === 0) {
        swap(strArr, i, n - 1);
      } else {
        swap(strArr, 0, n - 1);
      }
      res.push(...newRes);
    }
  }
  return res;
}

function testEquation(parts: number[], operands: string[]) {
  return parts.reduce((acc, part, partIndex) => {
    if (operands[partIndex] === "*") {
      console.log(
        `${acc} * ${parts[partIndex + 1]} = ${mult(
          acc,
          parts[partIndex + 1]
        )}`
      );
      return mult(acc, parts[partIndex + 1]);
    } else if (operands[partIndex] === "+") {
      console.log(
        `${acc} + ${parts[partIndex + 1]} = ${add(
          acc,
          parts[partIndex + 1]
        )}`
      );
      return add(acc, parts[partIndex + 1]);
    }
    return acc;
  }, parts[0]);
}
