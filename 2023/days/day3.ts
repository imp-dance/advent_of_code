import {
  getAdjacentIndices,
  getLines,
  matchAllWithIndex,
} from "../utils/utils";

const lines = getLines("./day3.input.txt");

const rows = lines.reduce((acc, row) => {
  const cols = row.split("");
  acc.push(cols);
  return acc;
}, [] as string[][]);

const numbers = lines.reduce((acc, line) => {
  const matches = matchAllWithIndex(line, /(\d+)/g);
  acc.push(
    matches.map((match) => ({
      value: parseInt(match.value),
      index: match.index,
    }))
  );
  return acc;
}, [] as { value: number; index: number }[][]);

const stars = lines.reduce((acc, line) => {
  const matches = matchAllWithIndex(line, /\*/g);
  acc.push(matches.map((match) => match.index));
  return acc;
}, [] as number[][]);

function checkIfPartNumber(
  value: number,
  startPos: { row: number; col: number }
) {
  const adjacentIndices = getAdjacentIndices(
    startPos.col,
    startPos.row,
    value.toString().length
  );
  const adjacentCells = adjacentIndices.map(
    ({ col, row }) => rows[row]?.[col]
  );
  return adjacentCells.some(
    (cell) => ![undefined, "."].includes(cell)
  );
}

function part1() {
  const partNumbers: number[] = [];
  lines.forEach((line, lineIndex) => {
    const numbersOnLine = numbers[lineIndex];
    numbersOnLine.forEach((number) => {
      if (
        checkIfPartNumber(number.value, {
          row: lineIndex,
          col: number.index,
        })
      ) {
        partNumbers.push(number.value);
      }
    });
  });
  return partNumbers.reduce((acc, number) => {
    return acc + number;
  }, 0);
}

function part2() {
  const gearRatios: number[] = [];
  lines.forEach((line, lineIndex) => {
    const starsOnLine = stars[lineIndex];
    starsOnLine.forEach((starIndex) => {
      const adjacentIndices = getAdjacentIndices(
        starIndex,
        lineIndex,
        1
      );
      const adjacentCells = adjacentIndices.map(
        ({ col, row }) => ({
          value: rows[row]?.[col],
          pos: { col, row },
        })
      );
      const adjacentCharacters = adjacentCells.filter((cell) =>
        cell.value.match(/[0-9]/g)
      );
      const adjacentNumbers = [
        ...new Set(
          adjacentCharacters.map((character) => {
            const targetNumber = numbers[character.pos.row].find(
              (number) => {
                const col = number.index;
                const row = character.pos.row;
                const length = number.value.toString().length;
                const range = [col, col + length];
                return (
                  character.pos.col >= range[0] &&
                  character.pos.col <= range[1]
                );
              }
            );
            if (!targetNumber) {
              throw new Error("Could not find target number");
            }
            return targetNumber.value;
          })
        ),
      ];
      if (adjacentNumbers.length === 2) {
        gearRatios.push(adjacentNumbers[0] * adjacentNumbers[1]);
      }
    });
  });
  return gearRatios.reduce((acc, number) => {
    return acc + number;
  }, 0);
}

console.log({ part1: part1(), part2: part2() });
