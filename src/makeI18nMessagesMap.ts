import { setProperty } from "dot-prop";
/**
 * @example
 * data: [
 *   ['login.username.label', "用户名", "username"],
 *   ['login.username.placeholder', "请输入用户名", "Please input your username"],
 * ]
 *
 * columnIndexLocaleMap: { 1: "zh-CN", 2: "en-U" }
 *
 * output: {
 *   "zh-CN": { login: { username: { label: "用户名", placeholder: "请输入用户名" } } },
 *   "en-US": { login: { username: { label: "username", placeholder: "Please input your username" } } },
 * }
 *
 * @param data
 * @param columnIndexLocaleMap
 */
export function makeI18nMessagesMap(
  data: string[][],
  columnIndexLocaleMap: Record<number, string>,
  flatten = false
): Record<string, Record<string, string>> {
  const output: Record<string, Record<string, string>> = {};
  data.forEach((col) => {
    const [id, ...msgs] = col;
    msgs.forEach((msg, index) => {
      const locale = columnIndexLocaleMap[index + 1]!;
      if (!output[locale]) {
        output[locale] = {};
      }
      const json = flatten
        ? { ...output[locale], [id]: msg }
        : setProperty(output[locale], id, msg);
      output[locale] = json;
    });
  });
  return output;
}
