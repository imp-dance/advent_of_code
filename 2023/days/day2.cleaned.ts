import { getLines } from "../utils/utils";

const lines = getLines("./day2.input.txt");

type Game = {
  id: string;
  hasAtleast: {
    blue: number;
    green: number;
    red: number;
  };
};

function parseLines(): Game[] {
  return lines.map((line) => {
    const [gameId, gameInfo] = line.split(":");

    return {
      id: gameId,
      hasAtleast: gameInfo.split(";").reduce(
        (acc, bucket) => {
          const items = bucket.split(",").map((item) => {
            const [value, name] = item.trim().split(" ");
            return {
              type: name as "red" | "green" | "blue",
              count: parseInt(value),
            };
          });
          items.forEach((item) => {
            if (item.count > acc[item.type]) {
              acc[item.type] = item.count;
            }
          });
          return acc;
        },
        { blue: 0, green: 0, red: 0 }
      ),
    };
  });
}

const games = parseLines();

export function part1() {
  return games
    .filter(
      (game) =>
        game.hasAtleast.blue <= 14 &&
        game.hasAtleast.green <= 13 &&
        game.hasAtleast.red <= 12
    )
    .map((game) => game.id)
    .reduce((acc, gameId) => {
      return acc + parseInt(gameId.split(" ")[1]);
    }, 0);
}

export function part2() {
  return games
    .map((game) => {
      return (
        game.hasAtleast.blue *
        game.hasAtleast.green *
        game.hasAtleast.red
      );
    })
    .reduce((acc, power) => {
      return acc + power;
    }, 0);
}

console.log({ part1: part1(), part2: part2() });
