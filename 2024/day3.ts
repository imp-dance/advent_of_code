import fs from "fs";

const commandSheet = fs.readFileSync("./day3.input.txt", "utf8");

const reg = /mul\([0-9]+\,[0-9]+\)/g;

const reg2 = /(mul\([0-9]+\,[0-9]+\))|(do\(\))|(don\'t\(\))/g;

const parseMult = (mult: string) => {
  const first = parseInt(mult.split(",")[0].substring(4));
  const secondRaw = mult.split(",")[1];
  const second = parseInt(secondRaw.slice(0, -1));
  return first * second;
};

function part1() {
  const result = commandSheet
    .match(reg)
    ?.map((value) => {
      const first = parseInt(value.split(",")[0].substring(4));
      const secondRaw = value.split(",")[1];
      const second = parseInt(secondRaw.slice(0, -1));
      return first * second;
    })
    .reduce((acc, item) => {
      return acc + item;
    }, 0);
  return result;
}

console.log(part1());

function part2() {
  const matches = commandSheet.match(reg2);
  if (!matches) return;
  let enabled = true;
  let mults = [];
  for (const match of matches) {
    if (match === "do()") {
      enabled = true;
    } else if (match === "don't()") {
      enabled = false;
    } else if (enabled) {
      mults.push(parseMult(match));
    }
  }
  return mults.reduce((acc, item) => acc + item, 0);
}

console.log(part2());
