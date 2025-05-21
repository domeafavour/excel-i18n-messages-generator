export function sortKeys(
  obj: Record<string, any>,
  order: string[],
  all: string[]
) {
  const keys = Object.keys(obj);
  const sortedKeys = keys.sort((a, b) => {
    const aIndex = order.indexOf(a);
    const bIndex = order.indexOf(b);
    if (aIndex === -1 && bIndex === -1) {
      return all.indexOf(a) - all.indexOf(b);
    }
    if (aIndex === -1) {
      return 1;
    }
    if (bIndex === -1) {
      return -1;
    }
    return aIndex - bIndex;
  });
  return sortedKeys;
}
