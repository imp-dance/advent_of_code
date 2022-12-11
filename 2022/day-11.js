const { data } = require("./data/day-11.js");
const monkeys = data.split("\n\n");

let state = {
  is_part_2: false,
};
let monkey_list = [];

class Monkey {
  constructor(
    starting_items,
    operation,
    test,
    on_success,
    on_failure
  ) {
    this.items = starting_items;
    this.operation = operation;
    this.test = test;
    this.on_success = on_success;
    this.on_failure = on_failure;
    this.inspect_count = 0;
  }

  give_item(item) {
    this.items.push(item);
  }

  parse_item(item) {
    if (state.is_part_2) {
      return eval(this.operation.replaceAll("x", item));
    }
    return Math.floor(
      eval(this.operation.replaceAll("x", item)) / 3
    );
  }

  run_test(item) {
    const [x, op, b] = this.test.split(" ");
    return parseInt(item) % parseInt(b) === 0;
  }

  inspect_item(modProd) {
    const item = this.items.shift();
    const new_item = this.parse_item(item);
    this.inspect_count++;
    const isSuccess = this.run_test(new_item);
    const target = isSuccess ? this.on_success : this.on_failure;
    monkey_list[target].give_item(
      modProd ? new_item % modProd : new_item
    );
  }

  inspect_all() {
    const modProd = monkey_list.reduce(
      (prod, monkey) =>
        prod * parseInt(monkey.test.split(" ")[2]),
      1
    ); // did not come up with this on my own, sad to say. I was stuck on part 2 for a while.
    while (this.items.length > 0) {
      this.inspect_item(state.is_part_2 ? modProd : undefined);
    }
  }
}

const resetState = () => {
  monkey_list.forEach((monkey) => {
    monkey.inspect_count = 0;
  });
  monkey_list = [];
  const parseMonkey = (monkey) => {
    const lines = monkey.split("\n").map((line) => line.trim());
    const data = lines.reduce((data, line) => {
      if (line.startsWith("Starting items")) {
        data.starting_items = line
          .split(": ")[1]
          .split(", ")
          .map((item) => parseInt(item));
      }
      if (line.startsWith("Operation")) {
        data.operation = line
          .split(": ")[1]
          .replace("new = old", "x")
          .replaceAll("old", "x");
      }
      if (line.startsWith("Test")) {
        if (line.includes("divisible by")) {
          data.test =
            line.split(": ")[1].replace("divisible by", "x %") +
            " === 0";
        }
      }
      if (line.startsWith("If true")) {
        data.on_success = parseInt(
          line
            .split(": ")[1]
            .replace("throw to monkey", "")
            .trim()
        );
      }
      if (line.startsWith("If false")) {
        data.on_failure = parseInt(
          line
            .split(": ")[1]
            .replace("throw to monkey", "")
            .trim()
        );
      }
      return data;
    }, {});
    monkey_list.push(
      new Monkey(
        data.starting_items,
        data.operation,
        data.test,
        data.on_success,
        data.on_failure
      )
    );
  };
  monkeys.forEach(parseMonkey);
};

resetState();

const part1 = () => {
  state.is_part_2 = false;
  resetState();
  for (let i = 1; i <= 20; i++) {
    for (let monkey = 0; monkey < monkey_list.length; monkey++) {
      monkey_list[monkey].inspect_all();
    }
  }
  const sorted = [...monkey_list].sort(
    (a, b) => b.inspect_count - a.inspect_count
  );
  return sorted[0].inspect_count * sorted[1].inspect_count;
};

const part2 = () => {
  state.is_part_2 = true;
  resetState();
  for (let i = 1; i <= 10000; i++) {
    for (let monkey = 0; monkey < monkey_list.length; monkey++) {
      monkey_list[monkey].inspect_all();
    }
  }
  const sorted = [...monkey_list].sort(
    (a, b) => b.inspect_count - a.inspect_count
  );
  return sorted[0].inspect_count * sorted[1].inspect_count;
};

console.log(part1());
console.log(part2());
