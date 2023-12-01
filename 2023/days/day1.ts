import { getLines } from "../utils/utils";

const lines = getLines("./day1.input.txt");

export function part1() {
  const nums = lines.map((line) => {
    const numbers = line
      .split("")
      .filter((char) => !isNaN(parseInt(char)))
      .map((char) => parseInt(char));
    return [numbers[0], numbers.at(-1)!] as const;
  });
  return nums.reduce((acc, item) => {
    return acc + parseInt(`${item[0]}${item[1]}`);
  }, 0);
}

const numMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function getStrNumbers(str: string) {
  const nums: {
    num: number;
    indices: number[];
  }[] = [];
  Object.keys(numMap).forEach((strNum) => {
    let regex = new RegExp(strNum, "gi"),
      result,
      indices = [];
    while ((result = regex.exec(str))) {
      indices.push(result.index);
    }
    nums.push({
      num: numMap[strNum as "one"],
      indices,
    });
  });
  return nums;
}

function getActualNumbers(str: string) {
  const nums: {
    num: number;
    indices: number[];
  }[] = [];
  ["1", "2", "3", "4", "5", "6", "7", "8", "9"].forEach(
    (strNum) => {
      let regex = new RegExp(strNum, "gi"),
        result,
        indices = [];
      while ((result = regex.exec(str))) {
        indices.push(result.index);
      }
      nums.push({
        num: parseInt(strNum),
        indices,
      });
    }
  );
  return nums;
}

export function part2() {
  const nums = lines.map((line) => {
    const stringNumbers = getStrNumbers(line);
    const actualNumbers = getActualNumbers(line);
    const numbers = [...stringNumbers, ...actualNumbers];
    numbers.sort((a, b) => a.indices[0] - b.indices[0]);
    const mapped = numbers
      .filter((num) => num.indices.length > 0)
      .reduce((acc, item) => {
        item.indices.forEach((index) => {
          acc[index] = item.num;
        });
        return acc;
      }, [] as number[])
      .filter((num) => num !== undefined);
    return [mapped[0], mapped.at(-1)!] as const;
  });
  return nums.reduce((acc, item) => {
    return (
      acc + parseInt(item[0].toString() + item[1].toString())
    );
  }, 0);
}

console.log({ part1: part1(), part2: part2() });
