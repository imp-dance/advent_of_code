import { readFileSync } from "fs";
import { expect } from "utils/test";

const input = readFileSync("./day9.input.txt", "utf8");

const tiles = input
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [col, row] = line
      .split(",")
      .map((v) => v.trim())
      .map((v) => parseInt(v));

    return {
      col,
      row,
    };
  });

const areas = tiles.reduce((acc, a, ai) => {
  tiles.forEach((b, bi) => {
    if (ai === bi) return;
    const w = Math.abs(a.col - b.col) + 1;
    const h = Math.abs(a.row - b.row) + 1;
    acc.push(w * h);
  });
  return acc;
}, [] as number[]);

const [largestArea] = areas.sort((a, b) => b - a);

expect(largestArea).toBe(4735222687);
