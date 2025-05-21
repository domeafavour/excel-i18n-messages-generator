import { flattenObject } from "../flattenObject";

type Added = { key: string; value: string };
type Removed = { key: string; value: string };
type Updated = { key: string; oldValue: string; newValue: string };

export function diffObjects(
  source: Record<string, any>,
  target: Record<string, any>
) {
  const diff: {
    ADDED: Added[];
    REMOVED: Removed[];
    UPDATED: Updated[];
  } = {
    ADDED: [],
    REMOVED: [],
    UPDATED: [],
  };

  const flattenSource = flattenObject(source);
  const flattenTarget = flattenObject(target);
  const sourceKeys = Object.keys(flattenSource);
  const targetKeys = Object.keys(flattenTarget);
  const keys = new Set<string>([...sourceKeys, ...targetKeys]);

  keys.forEach((key) => {
    if (flattenSource[key] === undefined) {
      diff.ADDED.push({
        key,
        value: flattenTarget[key],
      });
    } else if (flattenTarget[key] === undefined) {
      diff.REMOVED.push({
        key,
        value: flattenSource[key],
      });
    } else if (flattenSource[key] !== flattenTarget[key]) {
      diff.UPDATED.push({
        key,
        oldValue: flattenSource[key],
        newValue: flattenTarget[key],
      });
    }
  });

  return diff;
}
