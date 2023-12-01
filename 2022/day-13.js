const { data } = require("./data/day-13.js");
const pairs = data
  .split("\n\n")
  .map((pair) =>
    pair.split("\n").map((line) => JSON.parse(line))
  );

const state = {
  correctOrderIndices: [],
};

const resetState = () => {
  state.rightOrderCount = 0;
};

const part1 = () => {
  const compare = (left, right) => {
    if (typeof left === "number" && typeof right === "number") {
      if (left === right) {
        return null;
      } else if (left <= right) {
        return true;
      } else {
        return false;
      }
    }
    if (Array.isArray(left) && Array.isArray(right)) {
      for (
        let i = 0;
        i < Math.max(left.length, right.length);
        i++
      ) {
        if (left[i] === undefined) {
          return true;
        } else if (right[i] === undefined) {
          return false;
        } else {
          const comparison = compare(left[i], right[i]);
          if (comparison !== null) {
            return comparison;
          }
        }
      }
    }
    if (typeof left === "number" && Array.isArray(right)) {
      return compare([left], right);
    }
    if (Array.isArray(left) && typeof right === "number") {
      return compare(left, [right]);
    }
    return null;
  };

  let i = 1;
  for (const [left, right] of pairs) {
    const evaled = compare(left, right);
    if (evaled) {
      state.correctOrderIndices.push(i);
    }
    i++;
  }
  return state.correctOrderIndices.reduce((a, b) => a + b, 0);
};

console.log(part1());
