const { data } = require("./data/day-3");

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
  const sums = [];
  rucksacks.forEach((sacks) => {
    let sharedLetters = [];
    sacks[0].split("").forEach((item) => {
      if (sharedLetters.includes(item)) {
        // Ignore letter that's already been confirmed
        return;
      }
      if (sacks[1].includes(item)) {
        sharedLetters.push(item); // letter is shared between sacks
      }
    });
    sums.push(alphabet.indexOf(sharedLetters[0]) + 1);
  });
  const sum = sums.reduce((a, i) => a + i, 0);

  return sum;
};

// Part 2:
const part2 = () => {
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

  const commonLetters = groups.reduce((acc, group) => {
    let commonItem;
    alphabet.forEach((letter) => {
      if (group.every((item) => item.includes(letter))) {
        commonItem = letter;
      }
    });
    if (commonItem) {
      acc.push(commonItem);
    }
    return acc;
  }, []);

  const sum = commonLetters.reduce((acc, letter) => {
    acc += alphabet.indexOf(letter) + 1;
    return acc;
  }, 0);

  return sum;
};

part2();
