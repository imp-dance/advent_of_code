export function expect(a: any) {
  return {
    toBe: (b: any) => {
      if (a !== b) {
        console.log(`! ====== !\n❌ Expected`);
        console.log(a);
        console.log("to be");
        console.log(b);
        console.log("! ====== !\n");
      } else {
        console.log("✅");
      }
    },
  };
}
