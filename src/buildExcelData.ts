/**
 * @example
 * const messages = {
 *  en: {
 *   "hello": "Hello",
 *   "world": "World"
 * },
 * fr: {
 *   "hello": "Bonjour",
 *   "world": "Monde"
 * }
 *
 * buildExcelData(messages); // [["id", "en", "fr"], ["hello", "Hello", "Bonjour"], ["world", "World", "Monde"]]
 * @param messages
 * @returns
 */
export function buildExcelData(
  messages: Record<string, Record<string, string>>,
  defaultLocale?: string
): string[][] {
  const data: string[][] = [];
  const locales = Object.keys(messages);
  const header: string[] = ["id"];
  data.push(header);
  locales.forEach((locale) => {
    header.push(locale);
  });

  const messageIds = Object.keys(messages[defaultLocale ?? locales[0]]);
  messageIds.forEach((messageId) => {
    const row: string[] = [messageId];
    locales.forEach((locale) => {
      row.push(messages[locale][messageId] ?? "");
    });
    data.push(row);
  });

  return data;
}
