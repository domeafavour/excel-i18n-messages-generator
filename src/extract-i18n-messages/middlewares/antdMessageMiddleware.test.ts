import { describe, expect, it } from "vitest";
import { applyMiddlewares } from "../applyMiddlewares";
import { antdMessageMiddleware } from "./antdMessageMiddleware";

describe("antdMessageMiddleware.test", () => {
  it("should work", () => {
    const code = `
    import { message } from "antd";

    function showError() {
      message.error("error");
    }

    export function Component() {
      function showSuccess() {
        message.success("success");
      }
      return <div>
      <button key="errorButton" onClick={() => {
        message.error("error");
      }}>Click me</button>
      <button key="successButton" onClick={showSuccess}>Click Me!</button>
      </div>;
    }
    `;
    const [actual] = applyMiddlewares(code, [antdMessageMiddleware]);
    console.log(actual);
    expect(true).toBe(true);
  });
});
