import { readFileSync } from "fs";
import {
  createGrid,
  gridAt,
  lookAround,
  Pointer,
  pointersAreEqual,
  withinBounds,
} from "../utils/grid";

const input = readFileSync("./day12.input.txt", "utf-8");
const grid = createGrid(input);

let i = 0;
const genId = () => {
  i++;
  return i.toString();
};

type Area = {
  position: Pointer[];
  plant: string;
  id: string;
};

let areas: Area[] = [];

const merge = (a: Pointer, b: Pointer) => {
  const gridA = gridAt(a, grid);
  const gridB = gridAt(b, grid);
  const aAreaIdx = areas.findIndex((area) =>
    area.position.some((pos) => pointersAreEqual(pos, a))
  );
  const aArea = areas[aAreaIdx];
  const bAreaIdx = areas.findIndex((area) =>
    area.position.some((pos) => pointersAreEqual(pos, b))
  );
  const bArea = areas[bAreaIdx];
  if (gridA === gridB) {
    console.log("Two equal");
    if (aArea && !bArea) {
      console.log("Merging into A");
      areas[aAreaIdx].position.push(b);
    } else if (bArea && !aArea) {
      console.log("Merging into B");
      areas[bAreaIdx].position.push(a);
    } else if (aArea && bArea) {
      // two areas are connected
      if (aArea.id !== bArea.id) {
        bArea.position.forEach((p) =>
          areas[aAreaIdx].position.push(p)
        );
        areas = areas.filter((v) => v.id !== bArea.id);
        console.log("Joining two separate areas");
      }
    } else {
      console.log("Creating a new area with both values");
      // create new area
      areas.push({
        plant: gridA,
        position: [a, b],
        id: genId(),
      });
    }
  } else {
    if (!aArea) {
      console.log("Creating a new area for A");
      areas.push({
        plant: gridA,
        position: [a],
        id: genId(),
      });
    }
    if (!bArea) {
      console.log("Creating a new area for B");
      areas.push({
        plant: gridB,
        position: [b],
        id: genId(),
      });
    }
  }
};

grid.forEach((row, ri) => {
  row.forEach((_, ci) => {
    const { pointers } = lookAround([ri, ci], grid);
    pointers
      .filter((p) => withinBounds(p, grid))
      .forEach((p) => merge([ri, ci], p));
  });
});

const parsed = areas.map((area) => {
  let perimiter = 0;
  area.position.forEach((position) => {
    const around = lookAround(position, grid);
    const perimiters = around.values.filter(
      (v) => v !== area.plant
    );
    perimiter += perimiters.length;
  });
  return {
    area: area.position.length,
    perimiter,
    price: area.position.length * perimiter,
    plant: area.plant,
  };
});

console.log(
  parsed.reduce((acc, item) => {
    return acc + item.price;
  }, 0)
);
