import fs from "fs";

const file = fs.readFileSync("./day5.input.txt", "utf-8");

const [ordersRaw, updatesRaw] = file
  .split("\n\n")
  .map((block) => block.split("\n"));

const updates = updatesRaw.map((l) =>
  l.split(",").map((l) => parseInt(l, 10))
);

const orders = ordersRaw.map((l) =>
  l.split("|").map((l) => parseInt(l))
);

function sortOrder(a: number, b: number) {
  const shouldBeLargerThan = orders.filter(
    (order) => order[0] === a
  );
  const shouldBeSmallerThan = orders.filter(
    (order) => order[1] === a
  );
  if (shouldBeLargerThan.find(([, v]) => v === b)) {
    return -1;
  } else if (shouldBeSmallerThan.find(([v]) => v === b)) {
    return 1;
  }
  return 0;
}

function listsAreEqual(a: number[], b: number[]) {
  const aIsBigger = Math.max(a.length, b.length) === a.length;
  const loopOver = aIsBigger ? a : b;
  const compare = aIsBigger ? b : a;
  let isEqual = true;
  loopOver.forEach((item, i) => {
    if (item !== compare[i]) {
      isEqual = false;
    }
  });
  return isEqual;
}

function part1() {
  let sum = 0;
  updates.forEach((update) => {
    const sorted = [...update].sort(sortOrder);
    if (listsAreEqual(sorted, update)) {
      sum += sorted[Math.floor(sorted.length / 2)];
    }
  });
  return sum;
}

console.log(part1());

function part2() {
  let sum = 0;
  updates.forEach((update) => {
    const sorted = [...update].sort(sortOrder);
    if (!listsAreEqual(sorted, update)) {
      sum += sorted[Math.floor(sorted.length / 2)];
    }
  });
  return sum;
}

console.log(part2());
