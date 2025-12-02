import fs from "fs";

export const readLines = <T extends unknown = string>(
  path: string,
  mapper?: (line: string) => T
) => {
  const input = fs.readFileSync("./day1.input.txt", "utf8");
  return input
    .split("\n")
    .filter(Boolean)
    .map(mapper ?? ((l) => l as T));
};
