import { getLines } from "../utils/utils";
function parseValue(input) {
    const [value, name] = input.trim().split(" ");
    return {
        type: name,
        count: parseInt(value),
    };
}
function parseGameInput() {
    return getLines("./day2.input.txt").map((line) => {
        const [gameId, gameInfo] = line.split(":");
        const valueBuckets = gameInfo.split(";");
        return {
            id: parseInt(gameId.replace("Game ", "")),
            hasAtleast: valueBuckets.reduce((acc, bucket) => {
                const values = bucket.split(",").map(parseValue);
                values.forEach((item) => {
                    if (item.count > acc[item.type]) {
                        acc[item.type] = item.count;
                    }
                });
                return acc;
            }, { blue: 0, green: 0, red: 0 }),
        };
    });
}
const games = parseGameInput();
export function part1() {
    return games
        .filter((game) => game.hasAtleast.blue <= 14 &&
        game.hasAtleast.green <= 13 &&
        game.hasAtleast.red <= 12)
        .map((game) => game.id)
        .reduce((acc, id) => {
        return acc + id;
    }, 0);
}
export function part2() {
    return games
        .map((game) => {
        return (game.hasAtleast.blue *
            game.hasAtleast.green *
            game.hasAtleast.red);
    })
        .reduce((acc, power) => {
        return acc + power;
    }, 0);
}
console.log({ part1: part1(), part2: part2() });
