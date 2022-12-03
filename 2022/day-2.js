const scores = {
  p1: 0,
  p2: 0,
};

const scoreMap = {
  rock: 1,
  paper: 2,
  scissors: 3,
  win: 6,
  draw: 3,
};

const list = [
  "B Z",
  "B X",
  "C Y",
  // ... lots more lines
];

const rps = (p1, p2) => {
  scores.p1 += scoreMap[p1];
  scores.p2 += scoreMap[p2];
  const p1wins = () => {
    scores.p1 += scoreMap.win;
    console.log("Player 1 wins");
  };
  const p2wins = () => {
    scores.p2 += scoreMap.win;
    console.log("Player 2 wins");
  };
  if (p1 === p2) {
    scores.p1 += scoreMap.draw;
    scores.p2 += scoreMap.draw;
    return;
  }
  if (p1 === "rock") {
    if (p2 === "paper") {
      return p2wins();
    }
    return p1wins();
  }
  if (p1 === "paper") {
    if (p2 === "scissors") {
      return p2wins();
    }
    return p1wins();
  } else {
    if (p2 === "rock") {
      return p2wins();
    }
    return p1wins();
  }
};

// TASK 1:

list.forEach((item) => {
  const [p2, p1] = item.split(" ");
  const translator = {
    X: "rock",
    Y: "paper",
    Z: "scissors",
    A: "rock",
    B: "paper",
    C: "scissors",
  };
  rps(translator[p1], translator[p2]);
});

console.log(scores);

// TASK 2:
scores.p1 = 0;
scores.p2 = 0;

list.forEach((item, i) => {
  const [p2, p1] = item.split(" ");
  const translator = {
    X: p2 === "A" ? "scissors" : p2 === "B" ? "rock" : "paper",
    Y: p2 === "A" ? "rock" : p2 === "B" ? "paper" : "scissors",
    Z: p2 === "A" ? "paper" : p2 === "B" ? "scissors" : "rock",
    A: "rock",
    B: "paper",
    C: "scissors",
  };
  rps(translator[p1], translator[p2]);
});

console.log(scores);
