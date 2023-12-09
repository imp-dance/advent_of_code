import { getText } from "../utils/utils";
const text = getText("./day5.input.txt");
const [seedsRaw, ...sectionsRaw] = text.split("\n\n");
const seeds = seedsRaw
    .replace("seeds: ", "")
    .split(" ")
    .map((v) => parseInt(v));
const sections = sectionsRaw.map((sectionRaw) => ({
    name: sectionRaw.split(":")[0].replace(" map", ""),
    maps: sectionRaw
        .split("\n")
        .filter((l) => !l.endsWith(":"))
        .map((l, i) => l.split(" ").map((v) => parseInt(v))),
}));
const sectionHandlers = sections.reduce((acc, section, i) => {
    const handlers = [];
    section.maps.forEach((map) => {
        const [destinationRangeStart, sourceRangeStart, rangeLength,] = map;
        const sourceRangeEnd = sourceRangeStart + (rangeLength - 1);
        handlers.push({
            matches: (num) => num >= sourceRangeStart && num < sourceRangeEnd,
            operation: (num) => {
                console.log(num, "->", num + (destinationRangeStart - sourceRangeStart));
                return num + (destinationRangeStart - sourceRangeStart);
            },
            inRange: (start, stop) => {
                if (start >= sourceRangeStart && stop < sourceRangeEnd) {
                    // everything in range, should be handled by operation
                    return { inRange: true };
                }
                if (start > sourceRangeEnd && stop > sourceRangeEnd) {
                    return { inRange: false };
                }
                if (stop < sourceRangeStart &&
                    start < sourceRangeStart) {
                    return { inRange: false };
                }
                if (start > sourceRangeStart && start < sourceRangeEnd) {
                    return { inRange: true, overlap: true };
                }
                if (stop > sourceRangeStart && stop < sourceRangeEnd) {
                    return { inRange: false, overlap: true };
                }
                return { inRange: false };
            },
            start: sourceRangeStart,
            stop: sourceRangeEnd,
        });
    });
    acc.push(handlers);
    return acc;
}, []);
export function part1() {
    const positions = [...seeds];
    positions.forEach((_, seedIndex) => {
        sectionHandlers.forEach((handlers) => {
            // go through maps
            handlers.forEach((handler) => {
                if (handler.matches(positions[seedIndex])) {
                    positions[seedIndex] = handler.operation(positions[seedIndex]);
                }
            });
        });
    });
    return positions.sort((a, b) => a - b).at(0);
}
export function part2() {
    const seedRanges = [];
    for (let i = 0; i < seeds.length; i++) {
        if (i % 2 !== 0) {
            const start = Math.min(seeds[i - 1], seeds[i]);
            const end = Math.max(seeds[i - 1], seeds[i]);
            seedRanges.push({ start: start, stop: end });
        }
    }
    for (let seedIndex = 0; seedIndex < seedRanges.length; seedIndex++) {
        sectionHandlers.forEach((handlers, sectionIndex) => {
            // go through maps
            if (seedRanges[seedIndex].startAt &&
                seedRanges[seedIndex].startAt?.sectionIndex >
                    sectionIndex) {
                return;
            }
            handlers.forEach((handler, mapIndex) => {
                if (seedRanges[seedIndex].startAt &&
                    seedRanges[seedIndex].startAt?.sectionIndex ===
                        sectionIndex &&
                    seedRanges[seedIndex].startAt?.mapIndex > mapIndex) {
                    return;
                }
                const { start, stop } = seedRanges[seedIndex];
                const inRange = handler.inRange(start, stop);
                if (inRange.inRange === true) {
                    seedRanges[seedIndex].start = handler.operation(start);
                    seedRanges[seedIndex].stop = handler.operation(stop);
                    // totally in range, do operation on start and end of range
                }
                else if (inRange.overlap) {
                    if (start < handler.start &&
                        stop < handler.stop &&
                        stop > handler.start) {
                        // overlaps before start, into middle
                        seedRanges[seedIndex].start = handler.operation(handler.start);
                        seedRanges[seedIndex].stop = handler.operation(seedRanges[seedIndex].stop);
                        // ^ We cut the current range to the start of the handler
                        // and then add a new range that encompasses what we cut away
                        seedRanges.push({
                            start,
                            stop: handler.start,
                            startAt: { sectionIndex, mapIndex },
                        });
                    }
                    if (start > handler.start &&
                        start < handler.stop &&
                        stop > handler.stop) {
                        // We cut the current range to the end of the handler
                        seedRanges[seedIndex].start = handler.operation(seedRanges[seedIndex].start);
                        seedRanges[seedIndex].stop = handler.operation(handler.stop);
                        // and then add a new range that encompasses what we cut away
                        seedRanges.push({
                            start: handler.stop,
                            stop,
                            startAt: { sectionIndex, mapIndex },
                        });
                    }
                    if (start < handler.start && stop > handler.stop) {
                        seedRanges[seedIndex].start = handler.operation(handler.start);
                        seedRanges[seedIndex].stop = handler.operation(handler.stop);
                        // and then add a new range that encompasses what we cut away
                        seedRanges.push({
                            start,
                            stop: handler.start,
                            startAt: { sectionIndex, mapIndex },
                        });
                        // and then add a new range that encompasses what we cut away
                        seedRanges.push({
                            start: handler.stop,
                            stop,
                            startAt: { sectionIndex, mapIndex },
                        });
                    }
                }
            });
        });
    }
    return seedRanges.sort((a, b) => a.start - b.start).at(0);
}
console.log({
    part1: part1(),
    part2: part2(),
});
