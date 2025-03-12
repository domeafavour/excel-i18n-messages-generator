import { describe, expect, it } from "vitest";
import { applyMiddlewares } from "../applyMiddlewares";
import { addHookImportMiddleware } from "./addHookImportMiddleware";

describe("addHookImportMiddleware.test", () => {
  it('should insert useTranslation import from "react-i18next" if not exists', () => {
    const code = `
      export function Component() {
        const hello = "hello";
        const world = "world"; 
        return <span>{hello}{world}</span>;
    }`;
    const expected = `
      import { useTranslation } from "react-i18next";
      export function Component() {
        const hello = "hello";
        const world = "world"; 
        return <span>{hello}{world}</span>;
    }`;
    const [newCode] = applyMiddlewares(code, [addHookImportMiddleware]);
    expect(newCode).toBe(expected);
  });

  it('should not insert useTranslation import from "react-i18next" if already exists', () => {
    const code = `
      import { useTranslation } from "react-i18next";
      export function Component() {
        const hello = "hello";
        const world = "world"; 
        return <span>{hello}{world}</span>;
    }`;
    const expected = code;
    const [newCode] = applyMiddlewares(code, [addHookImportMiddleware]);
    expect(newCode).toBe(expected);
  });
});
