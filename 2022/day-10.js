const { data } = require("./data/day-10");
const lines = data.split("\n");

let state;

const resetState = () => {
  state = {
    X: 1,
    signalStrengths: [],
    drawing: ``,
  };
};

resetState();

const cycles = lines.reduce((acc, line) => {
  if (line.startsWith("noop")) {
    acc.push("noop");
    return acc;
  }
  if (line.startsWith("addx")) {
    acc.push("noop");
    acc.push(parseInt(line.split(" ")[1], 10));
  }
  return acc;
}, []);

const part1 = () => {
  resetState();
  cycles.forEach((command, i) => {
    const cycleNum = i + 1;
    if (cycleNum === 20 || (cycleNum + 20) % 40 === 0) {
      state.signalStrengths.push(cycleNum * state.X);
    }
    if (command === "noop") {
      return;
    }
    state.X += command;
  });
  return state.signalStrengths.reduce(
    (acc, signalStrength) => acc + signalStrength,
    0
  );
};

const part2 = () => {
  resetState();
  let currentLineNum = 1;
  cycles.forEach((command, i) => {
    let currentPixelContent = "";
    const cycleNum = i + 1;
    const currentPixelX =
      cycleNum - 40 * (currentLineNum - 1) - 1;
    const distance = Math.abs(currentPixelX - state.X);
    if (distance <= 1) {
      currentPixelContent = "#";
    } else {
      currentPixelContent = " ";
    }
    if (cycleNum % 40 === 0) {
      currentPixelContent += "\n";
      currentLineNum++;
    }
    state.drawing += currentPixelContent;
    state.X += command === "noop" ? 0 : command;
  });
  return state.drawing;
};

console.log(part1()); // 11220
console.log(part2()); // BZPAJELK
