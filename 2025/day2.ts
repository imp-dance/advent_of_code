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

const testRange = (
  range: Range,
  tester: (id: number) => boolean
) => {
  const passedIds = [];
  for (let id = range.start; id <= range.end; id++) {
    if (tester(id)) passedIds.push(id);
  }
  return passedIds;
};

const idIsInvalidPart1 = (id: number) => {
  const asString = id.toString();
  if (asString.length % 2 === 0) {
    const firstHalf = asString.substring(0, asString.length / 2);
    const secondHalf = asString.substring(asString.length / 2);
    return firstHalf === secondHalf;
  }
  return false;
};

const idIsInvalidPart2 = (id: number) => {
  const asString = id.toString();
  const chars = asString.split("");
  let sequenceAccumulator = "";

  // Array.every is used to break out of loop when done.
  // It's not very intuitive but returning `false` breaks the loop.
  const isInvalid = !chars.every((char, i) => {
    if (sequenceAccumulator.length === 0) {
      sequenceAccumulator += char;
      return true; // continue
    }

    const followingSequence = asString.substring(
      i,
      i + sequenceAccumulator.length
    );

    const repeatsAtleastOnce =
      sequenceAccumulator === followingSequence;

    const canRepeatUntilEnd =
      chars.length % sequenceAccumulator.length === 0;

    if (repeatsAtleastOnce && canRepeatUntilEnd) {
      const timesToRepeat =
        chars.length / sequenceAccumulator.length;
      const sequenceFullyRepeated =
        sequenceAccumulator.repeat(timesToRepeat);

      if (sequenceFullyRepeated === id.toString()) {
        return false; // ID is a looping sequence, stop looping
      }
    }

    sequenceAccumulator += char; // keep building sequence
    return true;
  });

  return isInvalid;
};

const part1 = () => {
  const invalidIds = idRanges
    .map((range) => testRange(range, idIsInvalidPart1))
    .flat();

  return sum(invalidIds);
};

const part2 = () => {
  const invalidIds = idRanges
    .map((range) => testRange(range, idIsInvalidPart2))
    .flat();

  return sum(invalidIds);
};

console.log({ part1: part1(), part2: part2() });
console.timeEnd("Time");

function sum(nums: number[]) {
  return nums.reduce((acc, n) => acc + n, 0);
}
