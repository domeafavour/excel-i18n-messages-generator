import xlsx from "node-xlsx";
import fs from "node:fs";
import path from "path";
import { makeColumnIndexLocaleMap } from "./makeColumnIndexLocaleMap";
import { makeI18nMessagesMap } from "./makeI18nMessagesMap";

const filePath = path.join(process.cwd(), "i18n-messages.xlsx");

const worksheets = xlsx.parse(filePath);
const worksheet = worksheets[0];
const [header, ...data] = worksheet.data;

const columnIndexLocaleMap = makeColumnIndexLocaleMap(header);
const i18nMessagesMap = makeI18nMessagesMap(data, columnIndexLocaleMap);

fs.mkdirSync(path.join(process.cwd(), "locales"), { recursive: true });

Object.keys(i18nMessagesMap).forEach((locale) => {
  const localeFilePath = path.join(process.cwd(), `locales/${locale}.json`);
  console.log(`Writing to ${localeFilePath}`);
  fs.writeFileSync(
    localeFilePath,
    JSON.stringify(i18nMessagesMap[locale], null, 2)
  );
});
