import { readFileSync } from "fs";

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

/*
    Finn alle overlapping par
    Split de opp sånn at de ikkje lenger overlappe
    Fortsett recursively til det ikkje lenger finnes par som overlappe

    Fjern alle duplicates, eller optimalt sett bare aldri produser duplicates
    
  */

const thereAreOverlappingRanges = () =>
  ranges.some((a, i) =>
    ranges.find((b, ri) => i !== ri && rangesOverlap(a, b))
  );

function splitOverlappingRanges() {
  const indiciesToIgnore: number[] = [];
  const acc: Range[] = [];

  ranges.forEach((range, i) => {
    if (indiciesToIgnore.includes(i)) return;
    let hasOverlap = false;
    ranges.forEach((b, bi) => {
      if (hasOverlap) return;
      if (i === bi) return;
      if (rangesAreEqual(range, b)) return;
      if (rangesOverlap(range, b)) {
        hasOverlap = true;
        indiciesToIgnore.push(i, bi);
        acc.push(...splitRanges(range, b));
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

function part2() {
  while (thereAreOverlappingRanges()) {
    splitOverlappingRanges();
    removeDuplicates();
    removeRedundantStarts();
    removeRedundantEnds();
  }
  console.log(ranges.length);
  return ranges.reduce(
    (acc, range) => (acc += range.end - range.start + 2),
    0
  );
}

console.log(part2());

function rangesOverlap(a: Range, b: Range): boolean {
  return !(a.end <= b.start || b.end <= a.start);
}

function rangesAreEqual(a: Range, b: Range) {
  return a.start === b.start && a.end === b.end;
}

function splitRanges(a: Range, b: Range) {
  const start = Math.min(a.start, b.start);
  const end = Math.max(a.end, b.end);

  const overlapStart = Math.max(a.start, b.start);
  const overlapEnd = Math.min(a.end, b.end);

  const aStraddles = a.start < b.start && a.end > b.end;
  const bStraddles = b.start < a.start && b.end > a.end;

  if (!(aStraddles || bStraddles)) {
    return [{ start, end }];
  }

  return [
    { start, end: overlapStart - 1 },
    { start: overlapStart, end: overlapEnd },
    { start: overlapEnd + 1, end },
  ];
}

// sjekk overlaps. Lag nye ranges ut ifra overlaps, sånn at det ikkje fins overlaps
// finally, gjer enkel kalkulasjon for å finna ut total mengde IDar
