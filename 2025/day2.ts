import { readFileSync } from "fs";

console.time("Time");

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
  const passedIds = [];
  for (let id = range.start; id <= range.end; id++) {
    if (checker(id)) passedIds.push(id);
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
  let currentSequence = "";

  const isInvalid = !chars.every((char, i) => {
    if (!currentSequence.length) {
      currentSequence += char; // start sequence
      return true;
    }

    const followingSequence = asString.substring(
      i,
      i + currentSequence.length
    );

    const repeatsAtleastOnce =
      currentSequence === followingSequence;

    const canRepeatUntilEnd =
      chars.length % currentSequence.length === 0;

    if (repeatsAtleastOnce && canRepeatUntilEnd) {
      const timesToRepeat =
        chars.length / currentSequence.length;
      const sequenceFullyRepeated =
        currentSequence.repeat(timesToRepeat);

      if (sequenceFullyRepeated === id.toString()) {
        return false; // ID is a looping sequence
      }
    }

    currentSequence += char; // keep building sequence
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

console.log({ part1: part1(), part2: part2() });
console.timeEnd("Time");

function sum(nums: number[]) {
  return nums.reduce((acc, n) => acc + n, 0);
}
