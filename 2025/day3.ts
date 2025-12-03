import { readFileSync } from "fs";

const input = readFileSync("./day3.input.txt", "utf-8");

const banks = input
  .split("\n")
  .filter(Boolean)
  .map((line) =>
    line
      .split("")
      .filter(Boolean)
      .map((item) => parseInt(item))
  );

function getHighestJoltsPart1(bank: number[]): number {
  const largestNum = findLargest(
    bank,
    (_, index) => index < bank.length - 1
  );
  const afterLargestNum = bank.slice(largestNum.index + 1);
  const largestAfter = findLargest(afterLargestNum).num;

  return Number(`${largestNum.num}${largestAfter}`);
}

function getHighestJoltsPart2(bank: number[]): number {
  let currentList = [...bank];
  let nums: number[] = [];
  const addedIndicies: number[] = [];
  for (let i = 0; i < 12; i++) {
    const largest = findLargest(currentList, (n, itemIndex) => {
      const alreadyAdded = addedIndicies.includes(itemIndex);
      const isAfterAdded = addedIndicies.every(
        (i) => i < itemIndex
      );
      if (!isAfterAdded) return false;
      if (alreadyAdded) return false;
      const spotsAfterIndex = currentList.length - itemIndex - 1;
      const spotsStillRequired = 12 - (i + 1);

      return spotsAfterIndex >= spotsStillRequired;
    });
    addedIndicies.push(largest.index);
    currentList[largest.index] = -99;
    nums.push(largest.num);
  }
  nums = nums.filter(Boolean);

  const res = Number(nums.join(""));
  return res;
}

function part1() {
  return banks.reduce(
    (acc, bank) => acc + getHighestJoltsPart1(bank),
    0
  );
}

function part2() {
  return banks.reduce(
    (acc, bank, i) => acc + getHighestJoltsPart2(bank),
    0
  );
}

function findLargest(
  nums: number[],
  condition?: (num: number, index: number) => boolean
) {
  return nums.reduce(
    (acc, item, index) => {
      const passesCondition =
        condition?.(acc.num, index) ?? true;
      if (item > acc.num && passesCondition) {
        return {
          num: item,
          index,
        };
      }
      return acc;
    },
    { num: 0, index: -1 }
  );
}

console.log({
  part1: part1(),
  part2: part2(),
});
