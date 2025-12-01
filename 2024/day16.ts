import { readFileSync } from "fs";
import {
  createGrid,
  lookAround,
  Pointer,
  pointersAreEqual,
  StandardDirection,
} from "../utils/grid";

const input = readFileSync("./day16.input.txt", "utf-8");
const grid = createGrid(input);

let pointer: Pointer = [0, 0];
let endPointer: Pointer = [0, 0];

const setInitialPositions = () => {
  grid.forEach((row, ri) => {
    row.forEach((col, ci) => {
      if (col === "S") {
        pointer = [ri, ci];
      } else if (col === "E") {
        endPointer = [ri, ci];
      } else if (col === ".") {
      }
    });
  });
};

setInitialPositions();

type Weight = {
  weight: number;
  pointer: Pointer;
};

type Trail = {
  pointers: Pointer[];
  cost: number;
};

const weights: Weight[] = [];
let hitStart = false;
let currentDirection: StandardDirection = "right";

const trails: Trail[] = [];
function stepWeight(p: Pointer, trail: Trail, distance: number) {
  trail.pointers.push(p);
  const newDistance = distance + 1;
  const possible = lookAround(p, grid);
  possible.values.forEach((value, idx) => {
    const directionOrder: StandardDirection[] = [
      "up",
      "right",
      "down",
      "left",
    ];
    const direction = directionOrder[idx];
    const pointer = possible.pointers[idx];
    if (
      value === "." &&
      !trail.pointers.find((v) =>
        pointersAreEqual(v, pointer)
      ) &&
      !pointersAreEqual(p, pointer)
    ) {
      // don't step back
      const amountOfTurns =
        direction === currentDirection
          ? 0
          : rotateTowards(currentDirection, direction) ===
            direction
          ? 1
          : 2;
      currentDirection = direction;
      const cost = 1 + amountOfTurns * 1000;
      const newTrail = {
        pointers: [...trail.pointers, pointer],
        cost: trail.cost + cost,
      };
      stepWeight(pointer, newTrail, newDistance);
    } else if (value === "E") {
      console.log("Found one path");
      trails.push({
        cost: trail.cost + 1,
        pointers: trail.pointers,
      });
    }
  });
}

stepWeight(pointer, { cost: 0, pointers: [] }, 0);

const shortestPath = trails.sort((a, b) => a.cost - b.cost)[0];
console.log(
  shortestPath.pointers.map((p) => p.join("-")).join(", ")
);
console.log(shortestPath.cost);

function rotateTowards(
  a: StandardDirection,
  b: StandardDirection
): StandardDirection {
  const order: StandardDirection[] = [
    "up",
    "right",
    "down",
    "left",
  ];
  if (a === "up" && b === "left") {
    return "left";
  }
  if (a === "left" && b === "up") {
    return "up";
  }
  const ai = order.indexOf(a);
  const bi = order.indexOf(b);
  const distance = Math.max(ai, bi) - Math.min(ai, bi);
  if (distance <= 1) {
    return b;
  } else {
    if (Math.max(ai, bi) === ai) {
      return order[ai - 1];
    } else {
      return order[ai + 1];
    }
  }
}
