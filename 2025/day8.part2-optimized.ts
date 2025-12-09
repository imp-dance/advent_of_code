import { readFileSync } from "fs";
import { expect } from "utils/test";

const input = readFileSync("./day8.input.txt", "utf-8");
let edgeIndex = 0;
type JunctionBox = {
  id: string;
  x: number;
  y: number;
  z: number;
  connections: string[];
};

let idIncr = 0;
const junctionBoxes: JunctionBox[] = input
  .trim()
  .split("\n")
  .map((line) => {
    const [x, y, z] = line
      .split(",")
      .map((n) => parseInt(n, 10));
    idIncr++;
    return {
      id: idIncr.toString(),
      x,
      y,
      z,
      connections: [],
    };
  });

const calculateEuclidianDistance = (
  a: JunctionBox,
  b: JunctionBox
) =>
  Math.sqrt(
    Math.pow(b.x - a.x, 2) +
      Math.pow(b.y - a.y, 2) +
      Math.pow(b.z - a.z, 2)
  );

type Edge = {
  a: JunctionBox;
  b: JunctionBox;
  dist: number;
};

const edges: Edge[] = [];

for (let i = 0; i < junctionBoxes.length; i++) {
  for (let j = i + 1; j < junctionBoxes.length; j++) {
    edges.push({
      a: junctionBoxes[i],
      b: junctionBoxes[j],
      dist: calculateEuclidianDistance(
        junctionBoxes[i],
        junctionBoxes[j]
      ),
    });
  }
}

edges.sort((e1, e2) => e1.dist - e2.dist);

class DSU {
  parent: number[];
  rank: number[];

  constructor(n: number) {
    this.parent = [...Array(n).keys()];
    this.rank = new Array(n).fill(0);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(a: number, b: number) {
    let pa = this.find(a);
    let pb = this.find(b);
    if (pa === pb) return;

    if (this.rank[pa] < this.rank[pb]) {
      this.parent[pa] = pb;
    } else if (this.rank[pb] < this.rank[pa]) {
      this.parent[pb] = pa;
    } else {
      this.parent[pb] = pa;
      this.rank[pa]++;
    }
  }

  allConnected(): boolean {
    const root = this.find(0);
    return this.parent.every((_, i) => this.find(i) === root);
  }
}

const dsu = new DSU(junctionBoxes.length);

let lastTwo: [string, string] = ["", ""];

while (!dsu.allConnected()) {
  const edge = edges[edgeIndex++];
  if (!edge) throw new Error("Ran out of edges unexpectedly");

  const aIdx = Number(edge.a.id) - 1;
  const bIdx = Number(edge.b.id) - 1;

  if (dsu.find(aIdx) === dsu.find(bIdx)) {
    continue;
  }

  edge.a.connections.push(edge.b.id);
  edge.b.connections.push(edge.a.id);

  dsu.union(aIdx, bIdx);

  lastTwo = [edge.a.id, edge.b.id];
}

const a = junctionBoxes.find((box) => box.id === lastTwo[0])!;
const b = junctionBoxes.find((box) => box.id === lastTwo[1])!;

expect(lastTwo.includes("336")).toBe(true);
expect(lastTwo.includes("410")).toBe(true);
expect(a.x * b.x).toBe(44543856);

console.log("Finished. Last two:", lastTwo);
