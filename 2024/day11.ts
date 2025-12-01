import { readFileSync } from "fs";

const input = readFileSync("./day11.input.txt", "utf-8");

function blink(stonePile: string) {
  const stones = stonePile.split(" ").filter(Boolean);
  let nextStones = "";
  stones.forEach((stone) => {
    const { length } = stone;
    if (stone === "0") {
      nextStones += "1";
    } else if (length % 2 === 0) {
      nextStones += BigInt(
        stone.substring(0, length / 2)
      ).toString();
      nextStones += " ";
      nextStones += BigInt(
        stone.substring(length / 2)
      ).toString();
    } else {
      const value = BigInt(stone);
      nextStones += (value * BigInt(2024)).toString();
    }
    nextStones += " ";
  });
  return nextStones;
}

function blinkOptimized(stonePile: string) {
  const stones = stonePile.split(" ").filter(Boolean);
  let nextStones = "";
  stones.forEach((stone) => {
    const { length } = stone;
    if (stone === "0") {
      nextStones += "1";
    } else if (length % 2 === 0) {
      nextStones += parseInt(
        stone.substring(0, length / 2)
      ).toString();
      nextStones += " ";
      nextStones += parseInt(
        stone.substring(length / 2)
      ).toString();
    } else {
      nextStones += (BigInt(stone) * BigInt(2024)).toString();
    }
    nextStones += " ";
  });
  return nextStones;
}

function blinkTimes(times: number, initial: string) {
  let stones = initial;
  for (let i = 0; i < times; i++) {
    stones = blink(stones);
  }
  return stones;
}

function part1() {
  const stones = blinkTimes(25, input);
  return stones.split(" ").filter(Boolean).length;
}

console.log(part1());

function part2() {
  // instead of creating a long string over time
  // we should release the memory when it's no longer needed
  // we can do this by finishing the leftmost value, counting it
  // then removing it

  // if the list of values becomes too large,
  // split it up and only keep going with half until that half is finished

  const maxValues = 30;
  const maxIterations = 75;
  type Bunk = {
    iterations: number;
    values: string[];
  };
  const initialBunks = input
    .split(" ")
    .filter(Boolean)
    .map((v) => ({
      iterations: 0,
      values: [v],
    }));
  const store = [...initialBunks];
  let amountOfStones = 0;

  const blinkBunk = (bunk: Bunk) => {
    const stones = bunk.values.join(" ");
    bunk.values = blink(stones).split(" ").filter(Boolean);
    bunk.iterations += 1;
  };
  let currentLength = 0;
  while (store.length > 0) {
    if (store[0].iterations === maxIterations) {
      amountOfStones += store[0].values.length;
      store.shift();
      if (amountOfStones.toString().length > currentLength) {
        console.log(amountOfStones);
        currentLength = amountOfStones.toString().length;
      }
      continue;
    }
    blinkBunk(store[0]);
    if (store[0].values.length > maxValues) {
      // split up into two bunks
      const firstBunk = {
        iterations: store[0].iterations,
        values: store[0].values.slice(0, maxValues),
      };
      const secondBunk = {
        iterations: store[0].iterations,
        values: store[0].values.slice(maxValues),
      };
      store.shift(); // remove current bunk and then add the newly split bunks
      store.unshift(secondBunk);
      store.unshift(firstBunk);
    }
  }
  return amountOfStones;
}

// Hvis lengden på et siffer, ex: 1234
// er partall, og da blir delt i 2, så
// vil det fortsetta å bli delt opp for
// alle resterande iterasjonar
// - men trailing zeros komme te å bli oddetall igjen
// som da blir 2024, som blir 20 24 - 2 0 2 4 - 2 1 2 4 - 2 2024 2 4 - 2 20 24 2 4, etc
// Det vil også sei at me vett koss mange tall den første 0 komme te å var itte 75 iterasjonar
// 5stk hver 6 runde.
// 75 / 6 = 12,5 = 12 amount of stones

// 89749 ->
// 181651976 ->
// 367663599424 ->
// 367663 599424 ->
// 367 663 599 424 ->
// 742808 1341912 1212376 858176
// reset

// det blei feil, men eg e inne på nåke
// Hvis et tall e divisible by 4, så vil
// resultate av å dela det på 2 var even
// aka begge nye stoneså vil ha et even
// number av digits

console.log(part2());

function mult2024(value: number) {
  return parseInt(`${value * 2}000`) + value * 24;
}

function countDigitsInProduct(x: number, y: number): number {
  if (x <= 0 || y <= 0) {
    throw new Error("Both x and y must be positive numbers.");
  }

  // Compute the base-10 logarithms of x and y
  const logX = Math.log10(x);
  const logY = Math.log10(y);

  // Sum the logarithms to approximate the logarithm of x * y
  const logProduct = logX + logY;

  // Floor the value and add 1 to get the digit count
  return Math.floor(logProduct) + 1;
}
