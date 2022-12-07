const { data } = require("./data/day-7.js");

const lines = data.split("\n");

class Node {
  constructor(name, size, parent, type) {
    this.name = name;
    this.size = size;
    this.parent = parent;
    this.children = [];
    this.type = type;
  }

  addChild(name, size, type) {
    this.children.push(new Node(name, size, this, type));
  }

  removeChild(name) {
    this.children = this.children.filter(
      (node) => node.name !== name
    );
  }

  getSize() {
    if (this.children.length === 0) {
      return this.size;
    }
    return this.children.reduce(
      (acc, child) => acc + child.getSize(),
      0
    );
  }
}

const root = new Node("/", 0, null, "dir");

const state = {
  pointer: null,
  isListing: false,
  log: false,
};

const parseLine = (line, i) => {
  const isCommand = line.startsWith("$");
  const isDirectory = line.startsWith("dir");
  const isFile = !isCommand && !isDirectory;
  if (isFile) {
    const [size, filename] = line.split(" ");
    state.pointer.addChild(filename, parseInt(size, 10), "file");
  }
  if (isDirectory) {
    const [_, directory] = line.split(" ");
    state.pointer.addChild(directory, 0, "dir");
  }
  if (isCommand) {
    const [_, command, arg] = line.split(" ");
    switch (command) {
      case "cd":
        state.isListing = false;
        switch (arg) {
          case "/":
            state.pointer = root;
            break;
          case "..":
            state.pointer = state.pointer.parent;
            break;
          default:
            state.pointer = state.pointer.children.find(
              (child) => child.name === arg
            );
        }
        break;
      case "ls":
        break;
      default:
        throw new Error(`Unknown command: ${command}`);
    }
  }
};

lines.forEach(parseLine);

const part1 = () => {
  let total = 0;
  const recursiveSearch = (node) => {
    if (node.type === "dir") {
      const size = node.getSize();
      if (size < 100000) {
        total += size;
      }
    }
    if (node.children) {
      node.children.forEach(recursiveSearch);
    }
  };
  root.children.forEach(recursiveSearch);
  return total;
};

const part2 = () => {
  const fileSystemSize = 70000000;
  const requiredSpace = 30000000;
  const availableSpace = fileSystemSize - root.getSize();
  const neededSpace = requiredSpace - availableSpace;
  const options = [];
  const recursiveSearch = (node) => {
    if (node.type === "dir") {
      const size = node.getSize();
      if (size >= neededSpace) {
        options.push(node);
      }
    }
    if (node.children) {
      node.children.forEach(recursiveSearch);
    }
  };
  root.children.forEach(recursiveSearch);
  return options.reduce((acc, option) => {
    if (option.getSize() < acc) return option.getSize();
    return acc;
  }, Infinity);
};

console.log(part1()); // 1447046
console.log(part2()); // 578710
