import { describe, expect, it } from "vitest";
import { mergeLocales } from "./mergeLocales";

describe("mergeLocales", () => {
  it("should skip source values when updates value is falsy", () => {
    const source = { a: "a", b: "b" };
    const updates = { a: "", b: undefined };

    const result = mergeLocales<any>(source, updates);

    expect(result).toEqual({ a: "a", b: "b" });
  });

  it("should use update string values when they exist", () => {
    const source = { a: "a", b: "b" };
    const updates = { a: "updated a", c: "c" };

    const result = mergeLocales<any>(source, updates);

    expect(result).toEqual({ a: "updated a", b: "b", c: "c" });
  });

  it("should deeply merge nested objects", () => {
    const source = {
      level1: {
        a: "a",
        nested: {
          x: "x",
          y: "y",
        },
      },
    };

    const updates = {
      level1: {
        a: "updated a",
        nested: {
          y: "updated y",
          z: "z",
        },
      },
    };

    const result = mergeLocales<any>(source, updates);

    expect(result).toEqual({
      level1: {
        a: "updated a",
        nested: {
          x: "x",
          y: "updated y",
          z: "z",
        },
      },
    });
  });

  it("should use update object when source value is not an object", () => {
    const source = { a: "a" };
    const updates = { a: { nested: "value" } };

    const result = mergeLocales<any>(source, updates);

    expect(result).toEqual({ a: { nested: "value" } });
  });

  it("should handle empty objects", () => {
    const source = {};
    const updates = { a: "a" };

    const result = mergeLocales(source, updates);

    expect(result).toEqual({ a: "a" });
  });

  it("should not include properties that are only in updates and have falsy values", () => {
    const source = { a: "a" };
    const updates = { b: "", c: undefined };

    const result = mergeLocales<any>(source, updates);

    expect(result).toEqual({ a: "a" });
  });

  it("should keep keys in the same order as source", () => {
    const source = { a: "a", b: "b", c: "c" };
    const updates = { c: "updated c", a: "updated a" };

    const result = mergeLocales<any>(source, updates);

    expect(result).toEqual({ a: "updated a", b: "b", c: "updated c" });
    expect(Object.keys(result)).toEqual(["a", "b", "c"]);
  });
});
