"use strict";
const races = [
    { time: 38, recordDistance: 234 },
    { time: 67, recordDistance: 1027 },
    { time: 76, recordDistance: 1157 },
    { time: 73, recordDistance: 1236 },
];
function part1() {
    // @ts-ignore
    const waysToWin = [];
    races.forEach((race) => {
        const possibleDistances = [];
        for (let timeToHold = 0; timeToHold < race.time; timeToHold++) {
            const distance = (race.time - timeToHold) * timeToHold;
            possibleDistances.push(distance);
        }
        const beatsRecord = possibleDistances.filter((distance) => distance > race.recordDistance);
        waysToWin.push(beatsRecord.length);
    });
    // @ts-ignore
    return waysToWin.reduce((acc, curr) => acc * curr, 1);
}
const part2game = {
    time: 38677673,
    recordDistance: 234102711571236,
};
function part2() {
    const possibleDistances = [];
    for (let timeToHold = 0; timeToHold < part2game.time; timeToHold++) {
        const distance = (part2game.time - timeToHold) * timeToHold;
        possibleDistances.push(distance);
    }
    const beatsRecord = possibleDistances.filter((distance) => distance > part2game.recordDistance);
    return beatsRecord.length;
}
console.log(part1());
console.log(part2());
