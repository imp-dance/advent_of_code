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
