const { data } = require("./data/day-9");
const lines = data.split("\n");

const headPosition = {
  horizontal: 0,
  vertical: 0,
};

const tailPosition = {
  horizontal: 0,
  vertical: 0,
};

const state = {
  tailTouched: [{ ...tailPosition }],
  tails: {
    0: { ...tailPosition },
    1: { ...tailPosition },
    2: { ...tailPosition },
    3: { ...tailPosition },
    4: { ...tailPosition },
    5: { ...tailPosition },
    6: { ...tailPosition },
    7: { ...tailPosition },
    8: { ...tailPosition },
  },
};

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
    !state.tailTouched.find(
      ({ horizontal, vertical }) =>
        horizontal === position.horizontal &&
        vertical === position.vertical
    )
  ) {
    state.tailTouched.push({ ...position });
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
  const validMoves = [
    tail, // try current position first.
    topLeftCorner,
    top,
    topRightCorner,
    right,
    bottomRightCorner,
    bottom,
    bottomLeftCorner,
    left,
  ].filter(
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

const part1 = () => {
  state.tailTouched = [{ horizontal: 0, vertical: 0 }];
  const followHead = () => {
    const bestMove = calculateBestMove(
      headPosition,
      tailPosition
    );
    tailPosition.horizontal = bestMove.horizontal;
    tailPosition.vertical = bestMove.vertical;
    touchTail(tailPosition);
  };
  const move = (command) => {
    switch (command) {
      case "U":
        headPosition.vertical--;
        break;
      case "D":
        headPosition.vertical++;
        break;
      case "L":
        headPosition.horizontal--;
        break;
      case "R":
        headPosition.horizontal++;
        break;
    }
    followHead();
  };
  commands.forEach((dir) => move(dir));
  return state.tailTouched.length;
};

const part2 = () => {
  headPosition.horizontal = 0;
  headPosition.vertical = 0;
  state.tailTouched = [{ horizontal: 0, vertical: 0 }];

  const followHead = (i) => {
    // Move the tail-head relative to the head.
    const bestMove = calculateBestMove(
      headPosition,
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

  const move = (command, i) => {
    switch (command) {
      case "U":
        headPosition.vertical--;
        break;
      case "D":
        headPosition.vertical++;
        break;
      case "L":
        headPosition.horizontal--;
        break;
      case "R":
        headPosition.horizontal++;
        break;
    }
    followHead(i);
  };
  commands.forEach(move);

  return state.tailTouched.length;
};

console.log(part1());
console.log(part2());
