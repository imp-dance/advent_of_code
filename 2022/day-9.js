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

const followHead = () => {
  const topLeftCorner = {
    horizontal: tailPosition.horizontal - 1,
    vertical: tailPosition.vertical - 1,
  };
  const topRightCorner = {
    horizontal: tailPosition.horizontal + 1,
    vertical: tailPosition.vertical - 1,
  };
  const bottomLeftCorner = {
    horizontal: tailPosition.horizontal - 1,
    vertical: tailPosition.vertical + 1,
  };
  const bottomRightCorner = {
    horizontal: tailPosition.horizontal + 1,
    vertical: tailPosition.vertical + 1,
  };
  const left = {
    horizontal: tailPosition.horizontal - 1,
    vertical: tailPosition.vertical,
  };
  const right = {
    horizontal: tailPosition.horizontal + 1,
    vertical: tailPosition.vertical,
  };
  const top = {
    horizontal: tailPosition.horizontal,
    vertical: tailPosition.vertical - 1,
  };
  const bottom = {
    horizontal: tailPosition.horizontal,
    vertical: tailPosition.vertical + 1,
  };
  const validMoves = [
    tailPosition, // try current position first.
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
      [-1, 0, 1].includes(
        option.horizontal - headPosition.horizontal
      ) &&
      [-1, 0, 1].includes(
        option.vertical - headPosition.vertical
      )
  );
  if (
    validMoves.find(
      ({ horizontal, vertical }) =>
        horizontal === tailPosition.horizontal &&
        vertical === tailPosition.vertical
    )
  ) {
    // Staying put is a valid option, just do that.
    return;
  }

  const distances = validMoves.map(
    (option) =>
      Math.abs(option.horizontal - headPosition.horizontal) +
      Math.abs(option.vertical - headPosition.vertical)
  );
  const minDistance = Math.min(...distances);
  const optimalIndex = distances.findIndex(
    (distance) => distance === minDistance
  );
  const optimalNextStep = validMoves[optimalIndex];
  tailPosition.horizontal = optimalNextStep.horizontal;
  tailPosition.vertical = optimalNextStep.vertical;
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

const part1 = () => {
  state.tailTouched = [{ horizontal: 0, vertical: 0 }];
  commands.forEach((dir) => move(dir));
  return state.tailTouched.length;
};

console.log(part1());
