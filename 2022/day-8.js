const { data } = require("./data/day-8");

const lines = data.split("\n");
const grid = [];
// grid[horizontal][vertical] = entry
// 0,0 is top left

const parseLine = (line, verticalIndex) => {
  const horizontalEntries = line.split("");
  horizontalEntries.forEach((entry, horizontalIndex) => {
    const parsedEntry = parseInt(entry);
    if (grid[horizontalIndex]) {
      grid[horizontalIndex].push(parsedEntry);
    } else {
      grid[horizontalIndex] = [parsedEntry];
    }
  });
};
lines.forEach(parseLine);

const getRanges = (pos) => {
  const { horizontal, vertical } = pos;
  const down = grid[horizontal].slice(vertical + 1);
  const up = grid[horizontal].slice(0, vertical).reverse();
  const right = grid
    .slice(horizontal + 1)
    .map((row) => row[vertical]);
  const left = grid
    .slice(0, horizontal)
    .reverse()
    .map((row) => row[vertical]);

  return {
    left,
    right,
    up,
    down,
  };
};

const isVisible = (pos) => {
  const entry = grid[pos.horizontal][pos.vertical];
  const ranges = getRanges(pos);

  const isVisible = [
    ranges.down,
    ranges.up,
    ranges.right,
    ranges.left,
  ].some((dir) => dir.every((testEntry) => testEntry < entry));
  return isVisible;
};

const getVisibilityRange = (pos) => {
  const entry = grid[pos.horizontal][pos.vertical];
  const ranges = getRanges(pos);

  const [left, right, up, down] = [
    ranges.left,
    ranges.right,
    ranges.up,
    ranges.down,
  ].map((dir, i) => {
    const range =
      dir.findIndex((testEntry) => testEntry >= entry) + 1;
    if (range === 0) return dir.length;
    return range;
  });

  return {
    left,
    right,
    up,
    down,
  };
};

const part1 = () => {
  const visibleCount = grid.reduce((colAcc, row, horizontal) => {
    const rowVisibleCount = row.reduce((rowAcc, _, vertical) => {
      return isVisible({ horizontal, vertical })
        ? rowAcc + 1
        : rowAcc;
    }, 0);
    return colAcc + rowVisibleCount;
  }, 0);
  return visibleCount;
};

const part2 = () => {
  let highestScenicScore = 0;
  grid.forEach((row, horizontal) => {
    row.forEach((entry, vertical) => {
      const range = getVisibilityRange({ horizontal, vertical });
      const scenicScore =
        range.up * range.left * range.down * range.right;
      if (scenicScore > highestScenicScore)
        highestScenicScore = scenicScore;
    });
  });
  return highestScenicScore;
};

console.log(part1());
console.log(part2());
