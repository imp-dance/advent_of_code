import fs from "fs";

const input = fs.readFileSync("./day1.input.txt", "utf8");

const parseLine = (line: string) =>
  [
    line[0] as "L" | "R",
    parseInt(line.substring(1).trim()),
  ] as const;

const lines = input.split("\n").map(parseLine);

const state = {
  num: 50,
};

const resetState = () => {
  state.num = 50;
};

const part1 = () => {
  resetState();
  let timesHitOne = 0;
  lines.forEach(([direction, degrees]) => {
    turn(direction, degrees);
    if (state.num === 0) timesHitOne++;
  });
  return timesHitOne;
};

const part2 = () => {
  resetState();
  let timesPassedOne = 0;
  lines.forEach(([direction, degrees]) => {
    let passedAtleast = Math.floor(degrees / 100);
    const rest = degrees % 100;
    if (direction === "R" && rest + state.num > 100) {
      passedAtleast += 1;
    } else if (
      direction === "L" &&
      state.num - rest < 0 &&
      state.num !== 0
    ) {
      passedAtleast += 1;
    }
    timesPassedOne += passedAtleast;
    turn(direction, degrees);
    if (state.num === 0) timesPassedOne += 1;
  });
  return timesPassedOne;
};

console.log({ part1: part1(), part2: part2() });

function turn(direction: "L" | "R", degrees: number) {
  if (direction === "R") {
    state.num = wrap(state.num + degrees, 100);
  } else {
    state.num = wrap(state.num - degrees, 100);
  }
}

function wrap(value: number, mod: number) {
  return ((value % mod) + mod) % mod;
}
