import { describe, expect, it } from "vitest";
import { makeI18nMessagesMap } from "./makeI18nMessagesMap";

describe("makeI18nMessagesMap", () => {
  it("should work", () => {
    expect(
      makeI18nMessagesMap(
        [
          ["login.username.label", "用户名", "username"],
          [
            "login.username.placeholder",
            "请输入用户名",
            "Please input your username",
          ],
        ],
        { 1: "zh-CN", 2: "en-US" }
      )
    ).toEqual({
      "zh-CN": {
        login: { username: { label: "用户名", placeholder: "请输入用户名" } },
      },
      "en-US": {
        login: {
          username: {
            label: "username",
            placeholder: "Please input your username",
          },
        },
      },
    });
  });

  it("should work with flatten", () => {
    expect(
      makeI18nMessagesMap(
        [
          ["login.username.label", "用户名", "username"],
          [
            "login.username.placeholder",
            "请输入用户名",
            "Please input your username",
          ],
        ],
        { 1: "zh-CN", 2: "en-US" },
        true
      )
    ).toEqual({
      "zh-CN": {
        "login.username.label": "用户名",
        "login.username.placeholder": "请输入用户名",
      },
      "en-US": {
        "login.username.label": "username",
        "login.username.placeholder": "Please input your username",
      },
    });
  });
});
