import { readFileSync } from "fs";
import { expect } from "utils/test";

const input = readFileSync("./day8.input.txt", "utf-8");
type JunctionBox = {
  id: string;
  x: number;
  y: number;
  z: number;
  connections: string[];
};

const calculateEuclidianDistance = (
  a: JunctionBox,
  b: JunctionBox
) => {
  return Math.sqrt(
    Math.pow(b.x - a.x, 2) +
      Math.pow(b.y - a.y, 2) +
      Math.pow(b.z - a.z, 2)
  );
};

let idIncr = 0;
const junctionBoxes = input
  .split("\n")
  .map((line): JunctionBox => {
    const [x, y, z] = line.split(",");
    idIncr++;
    return {
      x: parseInt(x),
      y: parseInt(y),
      z: parseInt(z),
      id: idIncr.toString(),
      connections: [],
    };
  });

const findSmallestDistance = (
  extraCondition?: (a: JunctionBox, b: JunctionBox) => boolean
): null | {
  amount: number;
  points: [JunctionBox, JunctionBox];
} => {
  let smallest: null | {
    amount: number;
    points: [JunctionBox, JunctionBox];
  } = null;

  junctionBoxes.forEach((p, i) => {
    const distances = junctionBoxes
      .filter((b, bi) => i !== bi)
      .filter((b) => extraCondition?.(p, b) ?? true)
      .map((b) => ({
        amount: calculateEuclidianDistance(p, b),
        points: [p, b].sort(sortJuncitonBoxes) as [
          JunctionBox,
          JunctionBox
        ],
      }))
      .sort((a, b) => a.amount - b.amount);
    if (distances[0].amount < (smallest?.amount ?? Infinity)) {
      smallest = distances[0];
    }
  });

  return smallest;
};

type Circuit = JunctionBox[];

let iterator = 0;
while (iterator < 1000) {
  iterator++;
  const distance = findSmallestDistance(
    (a, b) =>
      !a.connections.includes(b.id) &&
      !b.connections.includes(a.id)
  );
  if (!distance) throw new Error("Couldn't find next distance");
  distance.points[0].connections.push(distance.points[1].id);
  distance.points[1].connections.push(distance.points[0].id);
}

const circuits: string[][] = [];
junctionBoxes.forEach((junctionBox) => {
  if (circuits.find((c) => c.includes(junctionBox.id))) {
    return;
  }
  const circuit = new Set<string>();
  const search = (connectionId: string) => {
    if (circuit.has(connectionId)) return;
    const box = junctionBoxes.find(
      (box) => box.id === connectionId
    );
    circuit.add(connectionId);
    box?.connections.forEach(search);
  };
  junctionBox.connections.forEach(search);
  const asArray = [...circuit];
  if (asArray.length) {
    circuits.push(asArray);
  }
});

expect(
  circuits
    .sort((a, b) => b.length - a.length)
    .slice(0, 3)
    .reduce((acc, circuit) => acc * circuit.length, 1)
).toBe(40);

function sortJuncitonBoxes(a: JunctionBox, b: JunctionBox) {
  const zero = {
    x: 0,
    y: 0,
    z: 0,
  };
  return (
    calculateEuclidianDistance(a, {
      ...zero,
      connections: [],
      id: "",
    }) -
    calculateEuclidianDistance(b, {
      ...zero,
      connections: [],
      id: "",
    })
  );
}
