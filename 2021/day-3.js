const { data } = require("./data/day-3");

//
const rows = data.split("\n");
const bits = [];
rows.forEach((row, i) => {
  const currentBits = row.split("");
  currentBits.forEach((bit, i) => {
    if (!bits[i]) {
      bits[i] = [];
    }
    bits[i].push(bit);
  });
});

const gamma = bits
  .reduce((acc, bit) => {
    const ones = bit.filter((b) => b === "1");
    const zeros = bit.filter((b) => b === "0");
    acc.push(ones.length > zeros.length ? "1" : "0");
    return acc;
  }, [])
  .join("");

const epsilon = gamma
  .split("")
  .map((bit) => (bit === "1" ? "0" : "1"))
  .join("");

const toDecimal = (binary) => {
  return parseInt(binary, 2);
};

console.log(toDecimal(gamma) * toDecimal(epsilon));
