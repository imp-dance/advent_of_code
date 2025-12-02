export function findPairs<T>(arr: T[]) {
  return arr.flatMap((a, i) =>
    arr.slice(i + 1).map((b) => [a, b] as const)
  );
}
