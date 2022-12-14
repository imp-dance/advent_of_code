const { data } = require("./data/day-9");
const lines = data.split("\n");

const initializer = {
  horizontal: 0,
  vertical: 0,
};

let state;

const resetState = () => {
  state = {
    head: {
      ...initializer,
    },
    tail: {
      ...initializer,
    },
    tailsTouched: [{ ...initializer }],
    tails: {
      0: { ...initializer },
      1: { ...initializer },
      2: { ...initializer },
      3: { ...initializer },
      4: { ...initializer },
      5: { ...initializer },
      6: { ...initializer },
      7: { ...initializer },
      8: { ...initializer },
    },
  };
};

resetState();

const parseLine = (acc, command) => {
  const [direction, distance_str] = command.split(" ");
  const distance = parseInt(distance_str, 10);
  for (let i = 0; i < distance; i++) {
    acc.push(direction);
  }
  return acc;
};

const commands = lines.reduce(parseLine, []);

const touchTail = (position) => {
  if (
    !state.tailsTouched.find(
      ({ horizontal, vertical }) =>
        horizontal === position.horizontal &&
        vertical === position.vertical
    )
  ) {
    state.tailsTouched.push({ ...position });
  }
};

const calculateBestMove = (head, tail) => {
  const topLeftCorner = {
    horizontal: tail.horizontal - 1,
    vertical: tail.vertical - 1,
  };
  const topRightCorner = {
    horizontal: tail.horizontal + 1,
    vertical: tail.vertical - 1,
  };
  const bottomLeftCorner = {
    horizontal: tail.horizontal - 1,
    vertical: tail.vertical + 1,
  };
  const bottomRightCorner = {
    horizontal: tail.horizontal + 1,
    vertical: tail.vertical + 1,
  };
  const left = {
    horizontal: tail.horizontal - 1,
    vertical: tail.vertical,
  };
  const right = {
    horizontal: tail.horizontal + 1,
    vertical: tail.vertical,
  };
  const top = {
    horizontal: tail.horizontal,
    vertical: tail.vertical - 1,
  };
  const bottom = {
    horizontal: tail.horizontal,
    vertical: tail.vertical + 1,
  };
  const possibleMoves = [
    tail, // try current position first.
    topLeftCorner,
    top,
    topRightCorner,
    right,
    bottomRightCorner,
    bottom,
    bottomLeftCorner,
    left,
  ];
  const validMoves = possibleMoves.filter(
    (option) =>
      [-1, 0, 1].includes(option.horizontal - head.horizontal) &&
      [-1, 0, 1].includes(option.vertical - head.vertical)
  );
  if (
    validMoves.find(
      ({ horizontal, vertical }) =>
        horizontal === tail.horizontal &&
        vertical === tail.vertical
    )
  ) {
    // Staying put is a valid option, just do that.
    return { ...tail };
  }

  const distances = validMoves.map(
    (option) =>
      Math.abs(option.horizontal - head.horizontal) +
      Math.abs(option.vertical - head.vertical)
  );
  const minDistance = Math.min(...distances);
  const optimalIndex = distances.findIndex(
    (distance) => distance === minDistance
  );
  const optimalNextStep = validMoves[optimalIndex];
  return optimalNextStep;
};

const moveHead = (command) => {
  switch (command) {
    case "U":
      state.head.vertical--;
      break;
    case "D":
      state.head.vertical++;
      break;
    case "L":
      state.head.horizontal--;
      break;
    case "R":
      state.head.horizontal++;
      break;
  }
};

const part1 = () => {
  resetState();
  const move = (command) => {
    moveHead(command);
    const bestMove = calculateBestMove(state.head, state.tail);
    state.tail.horizontal = bestMove.horizontal;
    state.tail.vertical = bestMove.vertical;
    touchTail(state.tail);
  };
  commands.forEach((dir) => move(dir));
  return state.tailsTouched.length;
};

const part2 = () => {
  resetState();
  const move = (command) => {
    moveHead(command);
    // Move the tail-head relative to the head.
    const bestMove = calculateBestMove(
      state.head,
      state.tails[0]
    );
    state.tails[0].horizontal = bestMove.horizontal;
    state.tails[0].vertical = bestMove.vertical;

    // Move the rest of the tails relative to their previous index
    for (let i = 1; i < 9; i++) {
      const bestMove = calculateBestMove(
        state.tails[i - 1],
        state.tails[i]
      );
      state.tails[i].horizontal = bestMove.horizontal;
      state.tails[i].vertical = bestMove.vertical;
    }
    touchTail(state.tails[8]);
  };
  commands.forEach(move);
  return state.tailsTouched.length;
};

console.log(part1());
console.log(part2());
