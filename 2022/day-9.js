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
  headTouched: [{ ...headPosition }],
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
  const top = {
    horizontal: tailPosition.horizontal,
    vertical: tailPosition.vertical - 1,
  };
  const bottom = {
    horizontal: tailPosition.horizontal,
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
  const options = [
    tailPosition, // try current position first.
    topLeftCorner,
    top,
    topRightCorner,
    right,
    bottomRightCorner,
    bottom,
    bottomLeftCorner,
    left,
  ];
  const withinBounds = [-1, 0, 1];
  const workingOptions = options.filter(
    (option) =>
      withinBounds.includes(
        option.horizontal - headPosition.horizontal
      ) &&
      withinBounds.includes(
        option.vertical - headPosition.vertical
      )
  );
  if (
    workingOptions.find(
      ({ horizontal, vertical }) =>
        horizontal === tailPosition.horizontal &&
        vertical === tailPosition.vertical
    )
  ) {
    // Staying put is a working option, just do that.
    return;
  }
  if (workingOptions.length) {
    const distances = workingOptions.map((option) => {
      const horizontalDistance = Math.abs(
        option.horizontal - headPosition.horizontal
      );
      const verticalDistance = Math.abs(
        option.vertical - headPosition.vertical
      );
      return horizontalDistance + verticalDistance;
    });
    const minDistance = Math.min(...distances);
    const optimalIndex = distances.findIndex(
      (distance) => distance === minDistance
    );
    const optimal = workingOptions[optimalIndex];
    tailPosition.horizontal = optimal.horizontal;
    tailPosition.vertical = optimal.vertical;
  }
  if (
    !state.tailTouched.find(
      ({ horizontal, vertical }) =>
        horizontal === tailPosition.horizontal &&
        vertical === tailPosition.vertical
    )
  ) {
    state.tailTouched.push({ ...tailPosition });
  }
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
  state.headTouched.push(headPosition);
  followHead();
};

const part1 = () => {
  state.tailTouched = [{ horizontal: 0, vertical: 0 }];
  state.headTouched = [{ horizontal: 0, vertical: 0 }];
  commands.forEach((command) => {
    move(command);
  });
  return state.tailTouched.length;
};

console.log(part1());
