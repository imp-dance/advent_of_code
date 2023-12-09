import { getLines } from "../utils/utils.js";
const [raw_instructions, _, ...lines] = getLines("./day8.input.txt");
const instructions = raw_instructions
    .split("")
    .map((v) => (v === "L" ? 0 : 1));
const network = lines.reduce((acc, line) => {
    const [key, values_raw] = line.split(" = ");
    const values = values_raw
        .replace("(", "")
        .replace(")", "")
        .replace(",", "")
        .split(" ");
    acc[key] = values;
    return acc;
}, {});
function runInstructions(startPointers, condition) {
    const mutablePointers = [...startPointers];
    let loops = mutablePointers.length;
    const instructionsLength = instructions.length;
    let totalInstructions = 0;
    while (condition(mutablePointers, totalInstructions % instructionsLength, totalInstructions)) {
        for (let i = 0; i < loops; i++) {
            mutablePointers[i] =
                network[mutablePointers[i]][instructions[totalInstructions % instructionsLength]];
        }
        totalInstructions += 1;
    }
    return {
        options: mutablePointers,
        totalInstructions,
    };
}
function part1() {
    return runInstructions(["AAA"], (pointers) => pointers[0] !== "ZZZ").totalInstructions;
}
function part2() {
    const nodesThatEndWithA = Object.keys(network).filter((key) => key.endsWith("A"));
    return runInstructions(nodesThatEndWithA, (pointers) => pointers.some((p) => !p.endsWith("Z"))).totalInstructions;
}
/* console.log({
  part1: part1(),
  part2: part2(),
  // 17621 <- too low
}); */
// find iterations until "loop" per entry that starts with A until it find node that ends with Z
// figure out a number that goes up in every iteration loop
function part2solve2() {
    const nodesThatEndWithA = Object.keys(network).filter((key) => key.endsWith("A"));
    const zPositions = [];
    const visitedPositions = [];
    nodesThatEndWithA.forEach((n, i) => {
        visitedPositions[i] = [];
    });
    const iterationsPerLoop = nodesThatEndWithA.reduce((acc, startPos, iterationIndex) => {
        const totalIterationsBeforeLoop = runInstructions([startPos], ([pointer], instructionIndex, totalIndex) => {
            if (pointer.endsWith("Z")) {
                zPositions.push(totalIndex);
            }
            if (visitedPositions[iterationIndex].find((pos) => pos.pointer === pointer &&
                pos.instructionIndex === instructionIndex)) {
                return false;
            }
            else {
                visitedPositions[iterationIndex].push({
                    pointer,
                    instructionIndex,
                    totalIndex,
                });
                return true;
            }
        }).totalInstructions;
        acc.push(totalIterationsBeforeLoop);
        return acc;
    }, []);
    return {
        iterationsPerLoop,
        zPositions,
        offsets: iterationsPerLoop.map((v, i) => v - zPositions[i]),
    };
}
const info = part2solve2();
console.log(info);
let finalPosition = null;
let loopIndex = 0;
const longestLoop = info.iterationsPerLoop.reduce((a, b) => Math.max(a, b), -Infinity);
const longestLoopIndex = info.iterationsPerLoop.indexOf(longestLoop);
const longestLoopZPos = longestLoop - info.zPositions[longestLoopIndex];
const otherNums = info.iterationsPerLoop.filter((v, i) => i !== longestLoopIndex);
const otherOffsets = info.offsets.filter((v, i) => i !== longestLoopIndex);
const otherZIndices = info.zPositions.filter((v, i) => i !== longestLoopIndex);
console.log({
    longestLoopIndex,
    longestLoopZPos,
    otherNums,
    otherOffsets,
});
let currentCheck = longestLoopZPos;
while (finalPosition === null) {
    loopIndex++;
    currentCheck += longestLoop;
    if (otherNums.every((checker, i) => {
        const currentRelativeLoopPosition = currentCheck % checker;
        const isAtZ = currentRelativeLoopPosition === otherZIndices[i];
        if (isAtZ && i > 0) {
            console.log(i, " at Z");
        }
        return isAtZ;
    })) {
        finalPosition = currentCheck;
    }
}
console.log(finalPosition);
/**
 *
 * L-- [1201, 2100]
 * Z-- [1195, 2099]
 *
 * start: 3000
 *
 * 6000 % 1201 === 1196 !== 1195 // false
 * 6000 % 2100 === 1800 !== 2099 // false
 * ...
 * 9000 % 1201 === 593 !== 1195 // true
 * 9000 % 2100 === 600 !== 2099 // true
 *
 * [1, 2, 3]
 * [4, 1, 2, 3, 4]
 * [7, 6, 5, 4, 3, 2,]
 */
