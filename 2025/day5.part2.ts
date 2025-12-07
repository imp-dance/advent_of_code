import { readFileSync } from "fs";
import { expect } from "utils/test";

const input = readFileSync("./day5.input.txt", "utf8");

const [rangesToCheck] = input.split("\n\n");

type Range = {
  start: number;
  end: number;
};

let ranges = rangesToCheck.split("\n").map((range) => {
  const [from, to] = range.split("-");

  const asInts = [parseInt(from), parseInt(to)];

  return {
    start: Math.min(...asInts),
    end: Math.max(...asInts),
  } as Range;
});

const thereAreOverlappingRanges = () => {
  return ranges.some((a, i) =>
    ranges.some((b, ri) => i !== ri && rangesOverlap(a, b))
  );
};

function splitOverlappingRanges() {
  const acc: Range[] = [];
  const used: boolean[] = new Array(ranges.length).fill(false);

  ranges.forEach((range, i) => {
    if (used[i]) return;

    let hasOverlap = false;

    ranges.forEach((b, bi) => {
      if (i === bi || used[bi]) return;

      if (rangesAreEqual(range, b)) return;

      if (rangesOverlap(range, b)) {
        hasOverlap = true;
        used[i] = true;
        used[bi] = true;

        const splitted = splitRanges(range, b);
        acc.push(...splitted);
      }
    });

    if (!hasOverlap) acc.push(range);
  });

  ranges = acc;
}

function removeDuplicates() {
  const unique = [
    ...new Map(
      ranges.map((r) => [`${r.start}-${r.end}`, r])
    ).values(),
  ];
  ranges = unique;
}

function removeRedundantStarts() {
  const indiciesToRemove: number[] = [];
  ranges.forEach((range, i) => {
    let isIrrelevant = ranges.some(
      (r, bi) =>
        bi !== i && r.start === range.start && r.end > range.end
    );
    if (isIrrelevant) {
      indiciesToRemove.push(i);
    }
  });
  indiciesToRemove
    .sort((a, b) => b - a)
    .forEach((index) => ranges.splice(index, 1));
}

function removeRedundantEnds() {
  const indiciesToRemove: number[] = [];
  ranges.forEach((range, i) => {
    let isIrrelevant = ranges.some(
      (r, bi) =>
        bi !== i && r.end === range.end && r.start < range.start
    );
    if (isIrrelevant) {
      indiciesToRemove.push(i);
    }
  });
  indiciesToRemove
    .sort((a, b) => b - a)
    .forEach((index) => ranges.splice(index, 1));
}

function fixJoins() {
  ranges.sort((a, b) => a.start - b.start);
  const merged: Range[] = [];

  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (!last) {
      merged.push({ ...range });
    } else if (last.end >= range.start - 1) {
      last.end = Math.max(last.end, range.end);
    } else {
      merged.push({ ...range });
    }
  }

  ranges = merged;
}

function part2() {
  while (thereAreOverlappingRanges()) {
    splitOverlappingRanges();
    removeDuplicates();
    removeRedundantStarts();
    removeRedundantEnds();
    removeDuplicates();
    fixJoins();
  }
  return sumRanges(ranges);
}

expect(part2()).toBe(346240317247002);

function rangesOverlap(a: Range, b: Range): boolean {
  return !(a.end <= b.start || b.end <= a.start);
}

function rangesAreEqual(a: Range, b: Range) {
  return a.start === b.start && a.end === b.end;
}

function splitRanges(a: Range, b: Range): Range[] {
  const start = Math.min(a.start, b.start);
  const end = Math.max(a.end, b.end);

  const overlapStart = Math.max(a.start, b.start);
  const overlapEnd = Math.min(a.end, b.end);

  const aStraddles = a.start < b.start && a.end > b.end;
  const bStraddles = b.start < a.start && b.end > a.end;

  if (!(aStraddles || bStraddles)) {
    return [{ start, end }];
  }

  const res: Range[] = [];
  if (start <= overlapStart - 1) {
    res.push({ start, end: overlapStart - 1 });
  }
  res.push({ start: overlapStart, end: overlapEnd });
  if (overlapEnd + 1 <= end) {
    res.push({ start: overlapEnd + 1, end });
  }
  return res;
}

function sumRanges(ranges: Range[]) {
  return ranges.reduce((acc, range) => {
    return acc + (range.end - range.start + 1);
  }, 0);
}
