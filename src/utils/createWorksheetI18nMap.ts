import { makeColumnIndexLocaleMap } from "../makeColumnIndexLocaleMap";
import { makeI18nMessagesMap } from "../makeI18nMessagesMap";

export function createWorksheetI18nMap(
  worksheet: { name: string; data: any[][] },
  flatten: boolean
) {
  const [header, ...data] = worksheet.data;
  return makeI18nMessagesMap(data, makeColumnIndexLocaleMap(header), flatten);
}
