import { getLines } from "../utils/utils";

const lines = getLines("./day4.input.txt");

const games = lines.map((line) => {
  const [cardId, cardData] = line.split(": ");
  const id = parseInt(cardId.replace("Card ", ""));
  const [win, mine] = cardData.split(" | ");

  return {
    id,
    myNumbers: mine
      .split(" ")
      .map((c) => parseInt(c))
      .filter((n) => !isNaN(n)),
    winNumbers: win
      .split(" ")
      .map((c) => parseInt(c))
      .filter((n) => !isNaN(n)),
  };
});

function calculateScore(input: number[], winNumbers: number[]) {
  let score = 0;
  input.forEach((n) => {
    if (winNumbers.includes(n)) {
      if (score === 0) {
        score = 1;
      } else {
        score = score * 2;
      }
    }
  });
  return score;
}

let cache = new Map<
  number,
  { id: number; myNumbers: number[]; winNumbers: number[] }[]
>();
function getMatches(game: {
  winNumbers: number[];
  id: number;
  myNumbers: number[];
}) {
  if (cache.has(game.id)) {
    return cache.get(game.id)!;
  }
  let matches = 0;
  game.myNumbers.forEach((n) => {
    if (game.winNumbers.includes(n)) {
      matches++;
    }
  });
  const toAdd = games.slice(game.id, game.id + matches);
  cache.set(game.id, toAdd);
  return toAdd;
}

export function part1() {
  const points = games.reduce((acc, game) => {
    const score = calculateScore(
      game.myNumbers,
      game.winNumbers
    );
    acc += score;
    return acc;
  }, 0);
  return points;
}

export function part2() {
  let cards = [...games];
  for (let i = 0; i < games.length; i++) {
    const matches = getMatches(games[i]);
    const instances = cards.filter(
      (card) => card.id === games[i].id
    );
    instances.forEach((instance) => cards.push(...matches));
    cards.sort((a, b) => a.id - b.id);
  }
  return cards.length;
}

console.log({
  part1: part1(),
  part2: part2(),
});
