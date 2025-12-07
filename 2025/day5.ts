import { readFileSync } from "fs";

const input = readFileSync("./day5.input.txt", "utf8");

const [rangesToCheck, ingredientIdsToCheck] =
  input.split("\n\n");

type Range = {
  start: number;
  end: number;
};

const ranges = rangesToCheck.split("\n").map((range) => {
  const [from, to] = range.split("-");

  const asInts = [parseInt(from), parseInt(to)];

  return {
    start: Math.min(...asInts),
    end: Math.max(...asInts),
  } as Range;
});

const inRange = (range: Range, id: number) => {
  return range.start <= id && range.end >= id;
};

const ingredients = ingredientIdsToCheck
  .split("\n")
  .map((l) => parseInt(l.trim()));

function part1() {
  const freshIngredients = ingredients.reduce(
    (acc, ingredient) => {
      if (ranges.some((r) => inRange(r, ingredient))) {
        acc.push(ingredient);
      }
      return acc;
    },
    [] as number[]
  );

  return freshIngredients.length;
}

console.log({ part1: part1() });

export function splitRanges(A: Range, B: Range): Range[] {
  // Collect inclusive boundaries (+1 trick for inclusive end)
  const points = [A.start, A.end + 1, B.start, B.end + 1];

  // Unique + sorted
  const bounds = Array.from(new Set(points)).sort(
    (a, b) => a - b
  );

  const result: Range[] = [];

  for (let i = 0; i < bounds.length - 1; i++) {
    const start = bounds[i];
    const end = bounds[i + 1] - 1; // inclusive segment

    if (end < start) continue;

    // Keep segment if either original range covers it
    const inA = start >= A.start && start <= A.end;
    const inB = start >= B.start && start <= B.end;

    if (inA || inB) {
      result.push({ start, end });
    }
  }

  return result;
}
