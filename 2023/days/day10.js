import fs from "fs";
import { getLines } from "../utils/utils.js";
const lines = getLines("./day10.input.txt");
// grid[row][col]
const grid = [];
lines.forEach((row) => {
    grid.push([...row.split("")]);
});
const connectionMap = {
    "|": [
        [-1, 0],
        [1, 0],
    ],
    "-": [
        [0, -1],
        [0, 1],
    ],
    L: [
        [-1, 0],
        [0, 1],
    ],
    J: [
        [-1, 0],
        [0, -1],
    ],
    "7": [
        [1, 0],
        [0, -1],
    ],
    F: [
        [1, 0],
        [0, 1],
    ],
    ".": [],
    S: [
        [1, 0],
        [-1, 0],
        [0, -1],
        [0, 1],
    ],
};
const calculateNextGridItem = (pos, mutation) => {
    const nextRow = pos[0] + mutation[0];
    const nextCol = pos[1] + mutation[1];
    return {
        character: grid[nextRow]?.[nextCol] ?? ".",
        pos: [nextRow, nextCol],
    };
};
const getNextMutations = (pos, prevPos) => {
    const character = grid[pos[0]]?.[pos[1]] ?? ".";
    if (character === ".") {
        return [];
    }
    const mutation = connectionMap[character];
    if (character !== "S") {
        const [prevRow, prevCol] = prevPos;
        const [row, col] = pos;
        const rowChange = row - prevRow; // positive number is UP direction
        const colChange = col - prevCol; // positive number is LEFT direction
        if (mutation[0][0] === rowChange &&
            mutation[0][1] === colChange) {
            return [mutation[1]];
        }
        else {
            return [mutation[0]];
        }
    }
    const possibleNextPositions = [];
    for (const mutate of mutation) {
        const itemToMoveTo = calculateNextGridItem(pos, mutate);
        const moveConnectionType = connectionMap[itemToMoveTo.character];
        if (moveConnectionType.find((nextMut) => {
            // check if mutation takes us to a grid-space
            // on which we can get back. (connected both ways)
            const nextItem = calculateNextGridItem(itemToMoveTo.pos, nextMut);
            if (nextItem.pos[0] === pos[0] &&
                nextItem.pos[1] === pos[1]) {
                return true;
            }
            return false;
        })) {
            // can move
            possibleNextPositions.push(mutate);
        }
    }
    return possibleNextPositions;
};
const S_START_POS = grid.reduce((acc, item, index) => {
    const indexOfS = item.indexOf("S");
    if (indexOfS > -1) {
        return [index, indexOfS];
    }
    return acc;
}, null);
function step(path, onHitEnd) {
    const currentPosition = path[path.length - 1];
    const lastPosition = path[path.length - 2];
    const nextPossibleMutations = connectionMap[grid[currentPosition[0]][currentPosition[1]]];
    // from 0 to 1 would become -1, since we want to block the reverse
    // from 1 to 0 would become 1, ---||---
    const rowChange = (lastPosition[0] ?? 0) - currentPosition[0];
    const colChange = (lastPosition[1] ?? 0) - currentPosition[1];
    // check that atleast one of the mutations would take us back
    if (!nextPossibleMutations.some(([row, col]) => row === rowChange && col === colChange)) {
        //
        return [];
    }
    const nextMutation = nextPossibleMutations[0][0] === rowChange &&
        nextPossibleMutations[0][1] === colChange
        ? nextPossibleMutations[1] // don't go back to last position
        : nextPossibleMutations[0];
    const nextGridItem = calculateNextGridItem(currentPosition, nextMutation);
    if (nextGridItem.character !== "S") {
        // Keep going
        setTimeout(() => step([...path, nextGridItem.pos], onHitEnd), 0);
    }
    else if (nextGridItem.character === "S") {
        // Hit end
        onHitEnd([...path, nextGridItem.pos]);
    }
    else {
        // dead end / sub-loop
        return [];
    }
}
const paths = getNextMutations(S_START_POS, S_START_POS);
function getPart1Answer() {
    step([
        S_START_POS,
        calculateNextGridItem(S_START_POS, paths[0]).pos,
    ], (path) => {
        fs.writeFileSync("/Users/hakonunderbakke/Documents/Projects/advent_of_code/2023/days/day10.path.txt", JSON.stringify(path));
        console.log("Wrote file");
    });
}
// Part 1 answer: 13546 (total length of path) / 2 = 6773
const loopPathRaw = fs.readFileSync("/Users/hakonunderbakke/Documents/Projects/advent_of_code/2023/days/day10.path.txt", "utf8");
const loopPath = JSON.parse(loopPathRaw);
console.log("Looppath:", loopPath.length, loopPath[loopPath.length - 1], "->", loopPath[0]);
