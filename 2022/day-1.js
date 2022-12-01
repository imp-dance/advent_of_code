const content = document.querySelector("pre");

const summed = content
  .split("\n\n")
  .map((chunk) => {
    const sum = chunk.split("\n");
    return sum
      .map((i) => parseInt(i))
      .reduce((acc, item) => {
        acc += item;
        return acc;
      }, 0);
    return sum;
  })
  .filter((n) => !Number.isNaN(n));

summed.sort((a, b) => a - b);
summed.reverse();

const task1 = () => {
  return summed[0];
};

const task2 = () => {
  return summed[0] + summed[1] + summed[2];
};
