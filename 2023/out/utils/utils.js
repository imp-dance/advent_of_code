import fs from "fs";
import path from "path";
export const getLines = (filePath) => {
    return fs
        .readFileSync(path.join(__dirname, "../days", filePath), "utf8")
        .split("\n");
};
export const getText = (filePath) => {
    return fs.readFileSync(path.join(__dirname, "../days", filePath), "utf8");
};
export function matchAllWithIndex(str, regex) {
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
export function getAdjacentIndices(col, row, length) {
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
    adjacentIndices.push(left, right, bottomLeft, bottomRight, topLeft, topRight);
    return adjacentIndices;
}
export const arrayRange = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);
export function pushToIndex(arr, index, value) {
    return arr.splice(index, 0, value);
}
