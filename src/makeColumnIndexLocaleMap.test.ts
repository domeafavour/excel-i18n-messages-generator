import { describe, expect, it } from "vitest";
import { makeColumnIndexLocaleMap } from "./makeColumnIndexLocaleMap";

describe("makeColumnIndexLocaleMap", () => {
  it("should work", () => {
    expect(makeColumnIndexLocaleMap(["id", "zh-CN", "en-US"])).toEqual({
      1: "zh-CN",
      2: "en-US",
    });
  });
});
