import { deepKeys, getProperty } from "dot-prop";

export function flattenObject<T extends Record<string, string>>(
  obj: T
): Record<string, string> {
  return deepKeys(obj).reduce(
    (acc, key) => {
      acc[key] = getProperty(obj, key) ?? "";
      return acc;
    },
    {} as Record<string, string>
  );
}
