export const deepCopy = <T>(input: T): T => {
  if (Array.isArray(input)) {
    return [...input.map(deepCopy)] as T;
  }
  if (typeof input === "object" && input !== null) {
    return Object.entries(input).reduce((acc, [key, value]) => {
      // @ts-ignore
      acc[key] = deepCopy(value);
      return acc;
    }, {}) as T;
  }
  return input;
};
