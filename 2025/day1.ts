import fs from "fs";

const wrap = (value: number, mod: number) => {
  return ((value % mod) + mod) % mod;
};

const input = fs.readFileSync("./day1.input.txt", "utf8");
const lines = input
  .split("\n")
  .map(
    (line) =>
      [
        line[0] as "L" | "R",
        parseInt(line.substring(1).trim()),
      ] as const
  );

lines.forEach(([dir, degree], index) => {
  if (Number.isNaN(degree)) console.log("At ", index);
});

let num = 50;
const turn = (direction: "L" | "R", degrees: number) => {
  if (direction === "R") {
    num = wrap(num + degrees, 100);
  } else {
    num = wrap(num - degrees, 100);
  }
};

const part1 = () => {
  num = 50;
  let timesHitOne = 0;
  lines.forEach(([direction, degrees]) => {
    turn(direction, degrees);
    if (num === 0) timesHitOne++;
  });
  return timesHitOne;
};

const part2 = () => {
  let timesPassedOne = 0;
  num = 50;
  lines.forEach(([direction, degrees]) => {
    let passedAtleast = Math.floor(degrees / 100);
    const rest = degrees % 100;
    if (direction === "R" && rest + num > 100) {
      passedAtleast += 1;
    } else if (
      direction === "L" &&
      num - rest < 0 &&
      num !== 0
    ) {
      passedAtleast += 1;
    }
    timesPassedOne += passedAtleast;
    turn(direction, degrees);
    if (num === 0) timesPassedOne += 1;
  });
  return timesPassedOne;
};

console.log(part2());
