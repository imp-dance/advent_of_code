import { getLines } from "../utils/utils";

const reps = getLines("./knowit.day4.input.txt")[0]
  .split(",")
  .map((v) => parseInt(v.trim()));

export function part1() {
  let longest: number[] = [];
  let current: number[] = [];
  reps.forEach((rep, i) => {
    if (rep > (reps[i - 1] || 0)) {
      current.push(rep);
    } else {
      if (current.length > longest.length) {
        longest = current;
      }
      current = [rep];
    }
  });
  return longest.reduce((a, b) => a + b, 0);
}

console.log(part1());
