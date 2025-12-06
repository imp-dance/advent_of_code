export type Grid<T> = T[][];

/** `[rowIndex, columnIndex]` */
export type Pointer = [number, number];

export function moveUntilOob<T>(
  start: Pointer,
  updateRow: (a: number) => number,
  updateCol: (b: number) => number,
  grid: Grid<T>
) {
  return moveUntil(start, updateRow, updateCol, (r, c) =>
    withinBounds([r, c], grid)
  );
}

export function copyGrid<T>(grid: Grid<T>): Grid<T> {
  return [...grid.map((row) => [...row])];
}

export function createGrid<T>(
  input: string,
  parsePoint?: (v: string) => T
): T extends unknown ? string[][] : T[][] {
  return input
    .split("\n")
    .filter(Boolean)
    .map((row) => row.split(""))
    .map((row) =>
      row.map((entry) => (parsePoint?.(entry) ?? entry) as T)
    ) as T extends unknown ? string[][] : T[][];
}

export function moveUntil<T>(
  start: Pointer,
  updateRow: (a: number) => number,
  updateCol: (b: number) => number,
  condition: (currentRow: number, currentCol: number) => boolean
) {
  const trace: Pointer[] = [];
  let [currentRow, currentCol] = start;
  while (condition(currentRow, currentCol)) {
    currentRow = updateRow(currentRow);
    currentCol = updateCol(currentCol);
    trace.push([currentRow, currentCol]);
  }
  return trace;
}

export function withinBounds<T>(
  pointer: Pointer,
  grid: Grid<T>
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

export type StandardDirection = "up" | "left" | "right" | "down";

export function look<T>(
  pointer: Pointer,
  direction: StandardDirection,
  grid: Grid<T>
) {
  switch (direction) {
    case "up":
      return gridAt([pointer[0] - 1, pointer[1]], grid);
    case "down":
      return gridAt([pointer[0] + 1, pointer[1]], grid);
    case "left":
      return gridAt([pointer[0], pointer[1] - 1], grid);
    case "right":
      return gridAt([pointer[0], pointer[1] + 1], grid);
  }
}

export function lookAround<T>(pointer: Pointer, grid: Grid<T>) {
  const up = look(pointer, "up", grid);
  const down = look(pointer, "down", grid);
  const left = look(pointer, "left", grid);
  const right = look(pointer, "right", grid);
  return {
    values: [up, right, down, left],
    pointers: [
      move(pointer, "up"),
      move(pointer, "right"),
      move(pointer, "down"),
      move(pointer, "left"),
    ],
    up,
    right,
    down,
    left,
  };
}

export function lookAroundFor<T>(
  pointer: Pointer,
  condition: (value: T, pointer: Pointer) => boolean,
  grid: Grid<T>
) {
  const view = lookAround(pointer, grid);
  if (
    view.values.some((v, i) => condition(v, view.pointers[i]))
  ) {
    const dirMap: StandardDirection[] = [
      "up",
      "right",
      "down",
      "left",
    ];
    const direction =
      dirMap[
        view.values.findIndex((v, i) =>
          condition(v, view.pointers[i])
        )
      ];
    return direction;
  }
  return null;
}

export function move(
  pointer: Pointer,
  direction: StandardDirection
): Pointer {
  switch (direction) {
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

export function gridAt<T>(pointer: Pointer, grid: Grid<T>) {
  return grid[pointer[0]]?.[pointer[1]];
}

export function pointersAreEqual(a: Pointer, b: Pointer) {
  return a[0] === b[0] && a[1] === b[1];
}
