/**
 * column index to locale
 *
 * @example ["id", "zh-CN", "en-U"] => { 1: "zh-CN", 2: "en-U" }
 * @param cols
 */
export function makeColumnIndexLocaleMap(cols: string[]) {
  const [, ...locales] = cols;
  const map: Record<number, string> = {};
  locales.forEach((locale, index) => {
    map[index + 1] = locale;
  });
  return map;
}
