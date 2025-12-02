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
  passesCheck: (id: number) => boolean
) => {
  let currentId = range.start;
  const passedIds = [];
  while (currentId <= range.end) {
    const isInvalid = passesCheck(currentId);
    if (isInvalid) passedIds.push(currentId);
    currentId = currentId + 1;
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
  let currentSequence: string[] = [];
  let isInvalid = false;
  chars.every((char, i) => {
    if (!currentSequence.length) {
      currentSequence.push(char);
      return true; // keep looping
    }
    if (
      currentSequence.join("") ===
        chars.slice(i, i + currentSequence.length).join("") &&
      chars.length % currentSequence.length === 0
    ) {
      // matching sequence
      // now we check if its _only_ the matching sequence
      const currentSequenceToCheck = currentSequence.join("");
      const timesToRepeat =
        chars.length / currentSequence.length;
      if (
        currentSequenceToCheck.repeat(timesToRepeat) ===
        id.toString()
      ) {
        isInvalid = true;
        return false; // quit out
      } else {
        currentSequence.push(char);
        return true; // keep looping
      }
    } else {
      currentSequence.push(char);
    }
    return true; // keep looping
  });

  return isInvalid;
};

const part1 = () => {
  const invalidIds: number[] = [];
  idRanges.forEach((range) => {
    const currentInvalids = checkRange(range, idIsInvalidPart1);
    currentInvalids.forEach((id) => invalidIds.push(id));
  });
  return invalidIds.reduce((acc, v) => acc + v, 0);
};

const part2 = () => {
  const invalidIds: number[] = [];
  idRanges.forEach((range) => {
    const currentInvalids = checkRange(range, idIsInvalidPart2);
    currentInvalids.forEach((id) => invalidIds.push(id));
  });
  return invalidIds.reduce((acc, v) => acc + v, 0);
};

console.log(part2());
