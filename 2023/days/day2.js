import { getLines } from "../utils/utils";
const lines = getLines("./day2.input.txt");
const games = lines.map((line) => {
    const [gameId, gameInfo] = line.split(":");
    const buckets = gameInfo.split(";").map((bucket) => {
        const items = bucket.split(",").map((item) => {
            const [value, name] = item.trim().split(" ");
            return {
                type: name,
                count: parseInt(value),
            };
        });
        return items;
    });
    return {
        gameId,
        buckets,
    };
});
export function part1() {
    const MAX_CUBES = {
        blue: 14,
        green: 13,
        red: 12,
    };
    const possibleIds = [];
    games.forEach((game) => {
        let possible = true;
        game.buckets.forEach((bucket) => {
            bucket.forEach((item) => {
                if (item.count > MAX_CUBES[item.type]) {
                    possible = false;
                }
            });
        });
        if (possible) {
            possibleIds.push(game.gameId);
        }
    });
    return possibleIds.reduce((acc, gameId) => {
        return acc + parseInt(gameId.split(" ")[1]);
    }, 0);
}
export function part2() {
    const MAX_CUBES = {
        blue: 14,
        green: 13,
        red: 12,
    };
    const powers = [];
    games.forEach((game) => {
        const highestCount = {
            blue: 0,
            green: 0,
            red: 0,
        };
        game.buckets.forEach((bucket) => {
            bucket.forEach((item) => {
                if (item.count > highestCount[item.type]) {
                    highestCount[item.type] = item.count;
                }
            });
        });
        const power = highestCount.blue * highestCount.green * highestCount.red;
        powers.push(power);
    });
    return powers.reduce((acc, power) => {
        return acc + power;
    }, 0);
}
console.log(part1());
console.log(part2());
