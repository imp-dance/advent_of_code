import fs from "fs";

const file = fs.readFileSync("./day6.input.txt", "utf8");

let grid = file.split("\n").map((row) => row.split(""));

const order = ["up", "right", "down", "left"];
const pointerChar = ["^", "v", "<", ">"];
const OBSTACLE = "#";
const charToDir = {
  ">": "right",
  "<": "left",
  "^": "up",
  v: "down",
};

function runSequence() {
  let logs = [];
  let pointer = findGuard();
  const dirChar = checkPointer(pointer) as "^";
  let dir = charToDir[dirChar] as "up";
  let isWalkingInLoop = false;
  let currentSequence: string[] = [];

  while (withinBounds(pointer) && !isWalkingInLoop) {
    const posId = pointer.join("_");
    logs.push(posId);
    if (currentSequence.includes(posId + dir)) {
      isWalkingInLoop = true;
    } else {
      currentSequence.push(posId + dir);
    }
    const potentialNextPointer = move(pointer, dir);
    const ahead = checkPointer(potentialNextPointer);
    if (ahead === OBSTACLE) {
      dir = rotateRight(dir) as "up";
    } else {
      pointer = potentialNextPointer;
    }
  }
  return {
    uniquePositions: [...new Set(logs)].length,
    isWalkingInLoop,
  };
}

function part1() {
  return runSequence().uniquePositions;
}

console.log(part2());

function part2() {
  const originalGrid = [...grid];
  const spotsToTry: [number, number][] = [];
  originalGrid.forEach((row, ri) => {
    row.forEach((column, ci) => {
      if (column === ".") {
        spotsToTry.push([ri, ci]);
      }
    });
  });

  console.log(
    "Determined " + spotsToTry.length + " spots to test"
  );
  let amountOfLoopPositions = 0;
  const timeStart = new Date().getTime();
  let timePerHundred: number | null = null;
  spotsToTry.forEach((obstaclePos, i) => {
    if (i.toString().endsWith("00")) {
      const percentComplete = (
        (i / spotsToTry.length) *
        100
      ).toFixed(2);
      console.log(
        `${percentComplete}% (${i}/${spotsToTry.length}) ${
          timePerHundred
            ? `(~${(
                (((spotsToTry.length - i) / 100) *
                  timePerHundred) /
                1000
              ).toFixed(0)}s remaining)`
            : ""
        }`
      );
    }
    if (i === 100) {
      timePerHundred = new Date().getTime() - timeStart;
    }
    setGridItem(obstaclePos, "#");
    const { isWalkingInLoop } = runSequence();
    if (isWalkingInLoop) amountOfLoopPositions += 1;
    setGridItem(obstaclePos, ".");
  });
  return amountOfLoopPositions;
}

function setGridItem(pos: [number, number], value: string) {
  grid[pos[0]][pos[1]] = value;
}

function move(
  pointer: [number, number],
  dir: "up" | "left" | "right" | "down"
): [number, number] {
  switch (dir) {
    case "up":
      return [pointer[0] - 1, pointer[1]];
    case "down":
      return [pointer[0] + 1, pointer[1]];
    case "left":
      return [pointer[0], pointer[1] - 1];
    case "right":
      return [pointer[0], pointer[1] + 1];
  }
}

function withinBounds(pointer: [number, number]) {
  const vert = pointer[0];
  const hor = pointer[1];
  if (
    vert >= 0 &&
    vert < grid.length &&
    hor >= 0 &&
    hor < grid[0].length
  ) {
    return true;
  }
  return false;
}

function checkPointer([r, c]: [number, number]) {
  return grid[r]?.[c] ?? null;
}

function rotateRight(dir: "up" | "left" | "down" | "right") {
  const ind = order.indexOf(dir);
  if (ind === order.length - 1) {
    return order[0];
  }
  return order[ind + 1];
}

function findGuard() {
  const row = grid.find((row) =>
    pointerChar.some((c) => row.includes(c))
  );
  if (!row) throw new Error("Can't find guard");
  const rowInd = grid.indexOf(row);
  const colInd = row.indexOf(
    row.find((row) => pointerChar.includes(row))!
  );
  return [rowInd, colInd] as [number, number];
}
