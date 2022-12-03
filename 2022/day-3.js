const { data } = require("./data/day-3");

// Reduce data to a list of tuples, one tuple for each rucksack.
const rucksacks = data.split("\n").map((line) => {
  const lineLength = line.length;
  const room1 = line.substring(0, lineLength / 2);
  const room2 = line.substring(lineLength / 2);
  return [room1, room2];
});

const alphabet =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
    ""
  );

// Part 1:
const part1 = () => {
  const sums = rucksacks.reduce((acc, sacks) => {
    // Find the common letter in each sack.
    const sharedLetter = alphabet.reduce((letterAcc, letter) => {
      if (sacks.every((sack) => sack.includes(letter))) {
        letterAcc = letter;
      }
      return letterAcc;
    }, "");
    // Translate the letter to it's respective priority.
    acc.push(alphabet.indexOf(sharedLetter) + 1);
    return acc;
  }, []);

  return sums.reduce((a, i) => a + i, 0);
};

// Part 2:
const part2 = () => {
  // Reduce the rucksacks to groups of three sacks.
  const groups = [];
  let currentGroupIndex = 0;
  rucksacks.forEach((sacks) => {
    if (!groups[currentGroupIndex]) {
      groups[currentGroupIndex] = [];
    }
    groups[currentGroupIndex].push(`${sacks[0]}${sacks[1]}`);
    if (groups[currentGroupIndex].length === 3) {
      currentGroupIndex++;
    }
  });

  // Summize common letters for each group.
  const commonLetters = groups.reduce(
    (commonLetterAcc, group) => {
      const sharedLetter = alphabet.reduce(
        (sharedLetterAcc, letter) => {
          if (group.every((item) => item.includes(letter))) {
            sharedLetterAcc = letter;
          }
          return sharedLetterAcc;
        },
        ""
      );
      if (sharedLetter) {
        commonLetterAcc.push(sharedLetter);
      }
      return commonLetterAcc;
    },
    []
  );

  // Summize the common letters.
  const sum = commonLetters.reduce((sum, letter) => {
    sum += alphabet.indexOf(letter) + 1;
    return sum;
  }, 0);

  return sum;
};

console.log(part1());
console.log(part2());
