import { describe, expect, it } from "vitest";
import { buildExcelData } from "./buildExcelData";

describe("buildExcelData", () => {
  it("should return an array with the header", () => {
    const data = buildExcelData({
      en: { hello: "Hello", world: "World" },
      fr: { hello: "Bonjour", world: "Monde" },
    });
    expect(data).toEqual([
      ["id", "en", "fr"],
      ["hello", "Hello", "Bonjour"],
      ["world", "World", "Monde"],
    ]);
  });

  it("message value should be an empty string when its key not in the default messages", () => {
    const data = buildExcelData(
      {
        en: { hello: "Hello" },
        fr: { hello: "Bonjour", world: "Monde" },
      },
      "fr"
    );
    expect(data).toEqual([
      ["id", "en", "fr"],
      ["hello", "Hello", "Bonjour"],
      ["world", "", "Monde"],
    ]);
  });

  it("should use the first locale as the default locale when defaultLocale is not provided", () => {
    const data = buildExcelData({
      en: { hello: "Hello", world: "World" },
      fr: { hello: "Bonjour" },
    });
    expect(data).toEqual([
      ["id", "en", "fr"],
      ["hello", "Hello", "Bonjour"],
      ["world", "World", ""],
    ]);
  });
});
