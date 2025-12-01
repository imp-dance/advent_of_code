import { readFileSync } from "fs";

const input = readFileSync("./day9.input.txt", "utf-8");
const filesRaw = input.split("\n").filter(Boolean);

function parseDiskMap(diskMap: string) {
  const bits = diskMap
    .split("")
    .filter(Boolean)
    .map((v) => parseInt(v));
  const disk: Array<number | null> = [];
  let id = 0;
  bits.forEach((bit, index) => {
    const bitType = index % 2 === 0 ? "fileLength" : "freeSpace";
    if (bitType === "fileLength") {
      disk.push(...new Array(bit).fill(id));
      id += 1;
    } else {
      disk.push(...new Array(bit).fill(null));
    }
  });
  return disk;
}

function calculateChecksum(diskMap: (number | null)[]) {
  return diskMap.reduce((acc, fileid, index) => {
    return acc! + (fileid === null ? 0 : index * fileid);
  }, 0 as number);
}

function moveToFreeSpace(diskMap: (number | null)[]) {
  const copy = [...diskMap];
  while (copy.findIndex((v) => v === null) > -1) {
    const value = copy.pop();
    if (value !== null && value !== undefined) {
      const firstFreeSpaceIndex = diskMap.findIndex(
        (v) => v === null
      );
      copy[firstFreeSpaceIndex] = value;
    }
  }
  return copy;
}

function moveInBlocks(diskMap: (number | null)[]) {
  const copy = [...diskMap];
  let currentId = copy.at(-1)!;
  while (currentId > 0) {
    const amount = copy.filter((v) => v === currentId).length;
    const startIndex = copy.findIndex((v) => v === currentId);
    let currentSequenceLength = 0;
    let matchStartIndex: number | null = null;
    for (
      let i = 0;
      i < copy.length &&
      matchStartIndex === null &&
      i < startIndex;
      i++
    ) {
      if (copy[i] === null) {
        currentSequenceLength += 1;
        if (currentSequenceLength >= amount) {
          matchStartIndex = i - currentSequenceLength + 1;
        }
      } else {
        currentSequenceLength = 0;
      }
    }

    if (matchStartIndex !== null) {
      for (
        let currentIdIndex = 0;
        currentIdIndex < amount;
        currentIdIndex++
      ) {
        copy[startIndex + currentIdIndex] = null;
        copy[matchStartIndex + currentIdIndex] = currentId;
      }
    }

    currentId -= 1;
  }
  return copy;
}

function part1() {
  const diskMap = parseDiskMap(input);
  const compressedDiskmap = moveToFreeSpace(diskMap);
  return calculateChecksum(compressedDiskmap);
}

function part2() {
  const diskMap = parseDiskMap(input);
  const compressedDiskmap = moveInBlocks(diskMap);
  return calculateChecksum(compressedDiskmap);
}

console.log(part2());
