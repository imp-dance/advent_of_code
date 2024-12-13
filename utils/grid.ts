export function moveUntilOob(
  start: [number, number],
  updateRow: (a: number) => number,
  updateCol: (b: number) => number,
  grid: string[][]
) {
  const trace: [number, number][] = [];
  let [currentRow, currentCol] = start;
  while (withinBounds([currentRow, currentCol], grid)) {
    currentRow = updateRow(currentRow);
    currentCol = updateCol(currentCol);
    trace.push([currentRow, currentCol]);
  }
  return trace;
}

export function withinBounds(
  pointer: [number, number],
  grid: string[][]
) {
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
