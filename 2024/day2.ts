import fs from "fs";

const input = fs.readFileSync("./day2.input.txt", "utf8");
const reports = input.split("\n").map((report) => ({
  levels: report
    .split(" ")
    .filter(Boolean)
    .map((l) => parseInt(l.trim())),
}));

function parseReport(report: { levels: number[] }) {
  let prevNum;
  let safe = true;
  const allShould =
    report.levels[0] > report.levels[1]
      ? "decrease"
      : "increase";
  for (let i = 0; i < report.levels.length; i++) {
    const currentNum = report.levels[i];
    const prevNum = i === 0 ? null : report.levels[i - 1];
    if (prevNum !== null) {
      const isCurrentlyIncreasing = prevNum < currentNum;

      if (
        (isCurrentlyIncreasing && allShould === "decrease") ||
        (!isCurrentlyIncreasing && allShould === "increase")
      ) {
        safe = false;
        break;
      }
      const diff =
        Math.max(prevNum, currentNum) -
        Math.min(prevNum, currentNum);
      if (diff < 1 || diff > 3) {
        safe = false;
        break;
      }
    }
  }
  return {
    isSafe: safe,
  };
}

function part1() {
  return reports.filter((r) => parseReport(r).isSafe).length;
}

console.log(part1());

function part2() {
  return reports.filter((report) => {
    if (parseReport(report).isSafe) return true;
    let couldBeSafe = false;
    report.levels.forEach((r, i) => {
      const newReport = { levels: [...report.levels] };
      newReport.levels.splice(i, 1);
      if (parseReport(newReport).isSafe) {
        couldBeSafe = true;
      }
    });
    return couldBeSafe;
  }).length;
}

console.log(part2());
