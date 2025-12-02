import { readFileSync } from "fs";

const input = readFileSync("./day2.input.txt", "utf-8");

type Range = {
  start: number;
  end: number;
};

const idRanges = input.split(",").map((range) => {
  const [start, end] = range.split("-");
  return {
    start: parseInt(start),
    end: parseInt(end),
  };
});

const checkRange = (
  range: Range,
  checker: (id: number) => boolean
) => {
  let currentId = range.start;
  const passedIds = [];
  while (currentId <= range.end) {
    const isInvalid = checker(currentId);
    if (isInvalid) passedIds.push(currentId);
    currentId = currentId + 1;
  }
  return passedIds;
};

const checkIDPart1 = (id: number) => {
  const asString = id.toString();
  if (asString.length % 2 === 0) {
    const firstHalf = asString.substring(0, asString.length / 2);
    const secondHalf = asString.substring(asString.length / 2);
    return firstHalf === secondHalf;
  }
  return false;
};

const checkIDPart2 = (id: number) => {
  const asString = id.toString();
  const chars = asString.split("");
  let currentSequence: string[] = [];

  const isInvalid = !chars.every((char, i) => {
    if (!currentSequence.length) {
      currentSequence.push(char); // start sequence
      return true;
    }
    const currentSequenceStr = currentSequence.join("");
    const nextSequenceStr = chars
      .slice(i, i + currentSequence.length)
      .join("");

    const repeatsAtleastOnce =
      currentSequenceStr === nextSequenceStr;
    const canRepeatUntilEnd =
      chars.length % currentSequence.length === 0;

    if (repeatsAtleastOnce && canRepeatUntilEnd) {
      const timesToRepeat =
        chars.length / currentSequence.length;
      const sequenceFullyRepeated =
        currentSequenceStr.repeat(timesToRepeat);

      if (sequenceFullyRepeated === id.toString()) {
        return false; // ID is a looping sequence
      }
    }

    currentSequence.push(char); // keep building sequence
    return true;
  });

  return isInvalid;
};

const part1 = () => {
  const invalidIds = idRanges
    .map((range) => checkRange(range, checkIDPart1))
    .flat();

  return sum(invalidIds);
};

const part2 = () => {
  const invalidIds = idRanges
    .map((range) => checkRange(range, checkIDPart2))
    .flat();
  return sum(invalidIds);
};

console.time("Time");
console.log({ part1: part1(), part2: part2() });
console.timeEnd("Time");

function sum(nums: number[]) {
  return nums.reduce((acc, n) => acc + n, 0);
}
