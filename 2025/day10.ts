import { readFileSync } from "fs";
import { expect } from "utils/test";

const input = readFileSync("./day10.input.txt", "utf-8");

const fewestButtons: number[] = [];

expect(fewestButtons[0]).toBe(2);
expect(fewestButtons[1]).toBe(3);
expect(fewestButtons[2]).toBe(2);
expect(fewestButtons.length === 3).toBe(true);
expect(
  fewestButtons.reduce((acc, times) => acc + times, 0)
).toBe(7);
