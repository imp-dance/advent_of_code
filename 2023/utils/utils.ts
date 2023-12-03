import fs from "fs";
import path from "path";

export const getLines = (filePath: string) => {
  return fs
    .readFileSync(
      path.join(__dirname, "../days", filePath),
      "utf8"
    )
    .split("\n");
};

export function matchAllWithIndex(str: string, regex: RegExp) {
  const matches = [];
  let match;
  while ((match = regex.exec(str))) {
    matches.push({
      value: match[1],
      index: match.index,
    });
  }
  return matches;
}

export function getAdjacentIndices(
  col: number,
  row: number,
  length: number
) {
  const adjacentIndices = [];
  for (let i = 0; i < length; i++) {
    adjacentIndices.push({ col: col + i, row: row - 1 });
    adjacentIndices.push({ col: col + i, row: row + 1 });
  }
  const left = {
    col: col - 1,
    row: row,
  };
  const right = {
    col: col + length,
    row: row,
  };
  const bottomLeft = {
    col: col - 1,
    row: row + 1,
  };
  const bottomRight = {
    col: col + length,
    row: row + 1,
  };
  const topLeft = {
    col: col - 1,
    row: row - 1,
  };
  const topRight = {
    col: col + length,
    row: row - 1,
  };
  adjacentIndices.push(
    left,
    right,
    bottomLeft,
    bottomRight,
    topLeft,
    topRight
  );
  return adjacentIndices;
}
