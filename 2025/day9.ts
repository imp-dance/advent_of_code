import { readFileSync } from "fs";
import { expect } from "utils/test";

const input = readFileSync("./day9.input.txt", "utf8");

let id = 0;
const tiles = input
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [col, row] = line
      .split(",")
      .map((v) => v.trim())
      .map((v) => parseInt(v));
    id++;
    return {
      col: col,
      row: row,
      id,
    };
  });

const areaCache = new Map<string, number>();

tiles.forEach((a, ai) => {
  tiles.forEach((b, bi) => {
    if (ai === bi) return;
    const key = [a.id, b.id].sort().join("-");

    const w = Math.abs(a.col - b.col) + 1;
    const h = Math.abs(a.row - b.row) + 1;

    areaCache.set(key, w * h);
  });
});

const largestArea = [...areaCache.values()].sort(
  (a, b) => b - a
)[0];

expect(largestArea).toBe(4735222687);
