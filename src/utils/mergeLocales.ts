import { sortKeys } from "./sortKeys";

export function mergeLocales<T extends Record<string, any>>(
  source: T,
  updates: T,
  flatten = false
): Record<string, any> {
  const sourceKeys = Object.keys(source);
  const allKeys = new Set([...sourceKeys, ...Object.keys(updates)]);
  if (flatten) {
    return sortKeys({ ...source, ...updates }, sourceKeys, Array.from(allKeys));
  }

  // deep merge
  const result: Record<string, any> = {};
  for (const key of allKeys) {
    const sourceValue = source[key];
    const updatedValue = updates[key];
    // keep the value exists in source but not in target
    if (sourceValue && !updatedValue) {
      result[key] = sourceValue;
      continue;
    }

    if (typeof updatedValue === "string" && !!updatedValue.length) {
      result[key] = updatedValue;
      continue;
    }
    if (typeof updatedValue === "object") {
      if (sourceValue && typeof sourceValue === "object") {
        result[key] = mergeLocales(sourceValue, updatedValue, false);
      } else {
        result[key] = updatedValue;
      }
    }
  }
  return result;
}
