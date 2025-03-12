import { describe, expect, it } from "vitest";
import { applyMiddlewares } from "../applyMiddlewares";
import { replaceStringLiteralsMiddleware } from "./replaceStringLiteralsMiddleware";

describe("replaceStringLiteralsMiddleware.test", () => {
  it("should work", () => {
    const code = `
      export function Text() {
        const defaultText = "hello world";
        return <span>{defaultText}</span>;
      }
    `;
    const expected = `
      export function Text() {
        const defaultText = t("Text.defaultText");
        return <span>{defaultText}</span>;
      }
    `;

    const [newCode] = applyMiddlewares(code, [replaceStringLiteralsMiddleware]);
    expect(newCode).toBe(expected);
  });

  it("should not replace string literals that are not in a variable declaration", () => {
    const code = `
      export function Text() {
        return <span>{"hello world"}</span>;
      }
    `;
    const expected = `
      export function Text() {
        return <span>{"hello world"}</span>;
      }
    `;

    const [newCode] = applyMiddlewares(code, [replaceStringLiteralsMiddleware]);
    expect(newCode).toBe(expected);
  });

  it("should not replace string literals that variable is not in a Component", () => {
    const code = `
      const defaultText = "hello world";
    `;
    const expected = `
      const defaultText = "hello world";
    `;

    const [newCode] = applyMiddlewares(code, [replaceStringLiteralsMiddleware]);
    expect(newCode).toBe(expected);
  });

  it("should replace string literals that are object values", () => {
    const code = `
      export function Text() {
        const obj = { defaultText: "hello world" };
        return <span>{obj.defaultText}</span>;
      }
    `;
    const expected = `
      export function Text() {
        const obj = { defaultText: t("Text.obj.defaultText") };
        return <span>{obj.defaultText}</span>;
      }
    `;
    const [newCode] = applyMiddlewares(code, [replaceStringLiteralsMiddleware]);
    expect(newCode).toBe(expected);
  });

  it("should replace string literals that are in array", () => {
    const code = `
      export function Text() {
        const messages = ["hello", "world"];
        return <span>{messages[0]}</span>;
      }
    `;
    const expected = `
      export function Text() {
        const messages = [t("Text.messages.0"), t("Text.messages.1")];
        return <span>{messages[0]}</span>;
      }
    `;
    const [newCode] = applyMiddlewares(code, [replaceStringLiteralsMiddleware]);
    expect(newCode).toBe(expected);
  });
});
