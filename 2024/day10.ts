import { readFileSync } from "fs";
import {
  createGrid,
  gridAt,
  look,
  move,
  Pointer,
  pointersAreEqual,
} from "../utils/grid";

const input = readFileSync("./day10.input.txt", "utf-8");
const grid = createGrid<number>(input, (v) => parseInt(v));

const findTrailheads = () => {
  const trailheads: [number, number][] = [];
  grid.forEach((row, ri) => {
    row.forEach((column, ci) => {
      if (column === 0) trailheads.push([ri, ci]);
    });
  });
  return trailheads;
};

const trailheads = findTrailheads();

type Path = {
  pointer: Pointer;
  value: number;
  children: Path[];
  parent: Path | null;
};

function stepPath(path: Path) {
  const value = gridAt(path.pointer, grid);
  const directions = ["up", "down", "left", "right"] as const;
  directions.forEach((direction) => {
    if (look(path.pointer, direction, grid) === value + 1) {
      // viable path
      const newPointer = move(path.pointer, direction);
      path.children.push(
        stepPath({
          pointer: newPointer,
          value: gridAt(newPointer, grid),
          children: [],
          parent: path,
        })
      );
    }
  });
  return path;
}

function stripInvalidLeaves(path: Path): Path | false {
  let result: Path | false;
  let currentChild: Path;
  if (path.value === 9) return path;
  for (let i = 0; i < path.children.length; i++) {
    currentChild = path.children[i];
    result = stripInvalidLeaves(currentChild);
    if (result !== false) {
      return result;
    }
  }
  // hit dead end, we should retrace and remove this leaf.
  let currentParent = path.parent;
  let currentNode = path;
  while (currentParent && currentNode.children.length === 0) {
    currentParent.children = currentParent.children.filter(
      (v) => {
        return !pointersAreEqual(currentNode.pointer, v.pointer);
      }
    );
    currentNode = currentParent;
    currentParent = currentParent.parent;
  }
  return false;
}

function part1() {
  const scores: number[] = [];
  trailheads.forEach((trailhead, i) => {
    const path = stepPath({
      pointer: trailhead,
      value: gridAt(trailhead, grid),
      children: [],
      parent: null,
    });
    stripInvalidLeaves(path);
    let leaves: Path[] = [];
    const searchForLeaf = (v: Path) => {
      if (v.value === 9) {
        leaves.push(v);
      } else {
        v.children.forEach(searchForLeaf);
      }
    };
    path.children.forEach(searchForLeaf);
    leaves = leaves.filter((v, i) => {
      return (
        i ===
        leaves.findIndex((va) =>
          pointersAreEqual(va.pointer, v.pointer)
        )
      );
    });

    scores.push(leaves.length);
    console.log(`Trailhead ${i}: ${leaves.length}`);
  });

  return scores.reduce((acc, item) => {
    return acc + item;
  }, 0);
}

function part2() {
  const scores: number[] = [];
  trailheads.forEach((trailhead, i) => {
    const path = stepPath({
      pointer: trailhead,
      value: gridAt(trailhead, grid),
      children: [],
      parent: null,
    });
    stripInvalidLeaves(path);
    let leaves: Path[] = [];
    const searchForLeaf = (v: Path) => {
      if (v.value === 9) {
        leaves.push(v);
      } else {
        v.children.forEach(searchForLeaf);
      }
    };
    path.children.forEach(searchForLeaf);
    scores.push(leaves.length);
    console.log(`Trailhead ${i}: ${leaves.length}`);
  });

  return scores.reduce((acc, item) => {
    return acc + item;
  }, 0);
}

console.log(part2());

function findRootParent(leaf: Path) {
  if (!leaf.parent) return leaf;
  return findRootParent(leaf.parent);
}
