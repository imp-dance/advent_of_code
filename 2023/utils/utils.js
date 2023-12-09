import fs from "fs";
import path from "path";
import { URL } from "url";
const dirname = new URL(".", import.meta.url).pathname;
export const getLines = (filePath) => {
    return fs
        .readFileSync(path.join(dirname, "../days", filePath), "utf8")
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
export function combineArrays(array_of_arrays) {
    if (!array_of_arrays) {
        return [];
    }
    if (!Array.isArray(array_of_arrays)) {
        return [];
    }
    if (array_of_arrays.length == 0) {
        return [];
    }
    for (let i = 0; i < array_of_arrays.length; i++) {
        if (!Array.isArray(array_of_arrays[i]) ||
            array_of_arrays[i].length == 0) {
            return [];
        }
    }
    let odometer = new Array(array_of_arrays.length);
    odometer.fill(0);
    let output = [];
    let newCombination = formCombination(odometer, array_of_arrays);
    output.push(newCombination);
    while (odometer_increment(odometer, array_of_arrays)) {
        newCombination = formCombination(odometer, array_of_arrays);
        output.push(newCombination);
    }
    return output;
}
function formCombination(odometer, array_of_arrays) {
    return odometer.reduce(function (accumulator, odometer_value, odometer_index) {
        return ("" +
            accumulator +
            array_of_arrays[odometer_index][odometer_value]);
    }, "");
}
function odometer_increment(odometer, array_of_arrays) {
    for (let i_odometer_digit = odometer.length - 1; i_odometer_digit >= 0; i_odometer_digit--) {
        let maxee = array_of_arrays[i_odometer_digit].length - 1;
        if (odometer[i_odometer_digit] + 1 <= maxee) {
            odometer[i_odometer_digit]++;
            return true;
        }
        else {
            if (i_odometer_digit - 1 < 0) {
                return false;
            }
            else {
                odometer[i_odometer_digit] = 0;
                continue;
            }
        }
    }
}
