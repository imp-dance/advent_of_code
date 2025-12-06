import { readFileSync } from "fs";
import { deepCopy } from "../utils/copy";

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

const getRange = (range: Range) => {
  const items = [];
  for (let id = range.start; id <= range.end; id++) {
    items.push(id);
  }
  return items;
};

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

function part2() {
  const tempRanges = deepCopy(ranges);
  let lastLength = -1;

  while (tempRanges.length !== lastLength) {
    lastLength = tempRanges.length;

    const toDelete = new Set<number>();
    const toAdd: Range[] = [];

    for (let ai = 0; ai < tempRanges.length; ai++) {
      const a = tempRanges[ai];

      for (let bi = 0; bi < tempRanges.length; bi++) {
        if (ai === bi) continue;
        const b = tempRanges[bi];

        if (rangesAreEqual(a, b)) {
          // toDelete.add(bi);
        } else if (rangesOverlap(a, b)) {
          const newOnes = splitRanges(a, b);
          toDelete.add(ai);
          toDelete.add(bi);
          toAdd.push(...newOnes);
        }
      }
    }

    [...toDelete]
      .sort((a, b) => b - a)
      .forEach((index) => tempRanges.splice(index, 1));

    tempRanges.push(...toAdd);
  }

  while (
    tempRanges.some((range, i) =>
      tempRanges.find(
        (r, ri) => rangesAreEqual(r, range) && i !== ri
      )
    )
  ) {
    const duplicates = new Set<number>();

    tempRanges.forEach((range, i) => {
      tempRanges.forEach((test, bi) => {
        if (
          range.start === test.start &&
          range.end === test.end &&
          i !== bi
        ) {
          duplicates.add(bi);
        }
      });
    });

    [...duplicates]
      .sort((a, b) => b - a)
      .forEach((index) => tempRanges.splice(index, 1));
  }
  console.log(tempRanges);
  // now all ranges should be split up
  const freshIngredients = tempRanges.reduce((acc, range) => {
    if (range.end === range.start) {
      acc += 1;
    } else {
      acc += range.end - range.start + 1;
    }
    return acc;
  }, 0);

  return freshIngredients;
}

console.log({ part1: part1(), part2: part2() });

function rangesOverlap(a: Range, b: Range): boolean {
  // Two ranges do not overlap if one ends before the other starts
  return !(a.end <= b.start || b.end <= a.start);
}

function rangesAreEqual(a: Range, b: Range) {
  return a.start === b.start && a.end === b.end;
}

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
/* 
function splitRanges(a: Range, b: Range) {
  // splits two overlapping ranges into three (not overlapping) ranges
  const smallest =
    Math.min(a.start, b.start) === a.start ? { ...a } : { ...b };
  const largest =
    smallest.start === a.start && smallest.end === a.end
      ? { ...b }
      : { ...a };

  const overlap = smallest.end - largest.start - 1;

  const middle = {
    start: largest.start,
    end: largest.start + overlap,
  } as Range;

  largest.start = middle.end + 1;
  smallest.end = middle.start - 1;

  const ranges = [smallest, middle, largest];
  ranges.forEach((r, i) => {
    if (r.start === r.end) {
      ranges.splice(i, 1);
    }
  });
  return ranges;
} */

// sjekk overlaps. Lag nye ranges ut ifra overlaps, sånn at det ikkje fins overlaps
// finally, gjer enkel kalkulasjon for å finna ut total mengde IDar
