import { readFileSync } from "fs";
import { expect } from "utils/test";

const input = readFileSync("./day5.input.txt", "utf8");

const [rangesToCheck] = input.split("\n\n");

type Range = {
  start: number;
  end: number;
};

const ranges = rangesToCheck
  .split("\n")
  .map((range) => {
    const [start, end] = range.split("-");

    return {
      start: parseInt(start),
      end: parseInt(end),
    } as Range;
  })
  .sort((a, b) => a.start - b.start);

const merged: Range[] = [ranges[0]];

ranges.slice(1).forEach((range) => {
  const last = merged[merged.length - 1];
  if (range.start > last.end) {
    merged.push(range);
  } else if (range.end > last.end) {
    last.end = range.end;
  }
});

expect(
  merged.reduce((acc, range) => {
    return acc + (range.end - range.start + 1);
  }, 0)
).toBe(346240317247002);
