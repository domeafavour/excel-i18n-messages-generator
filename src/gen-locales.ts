import xlsx from "node-xlsx";
import fs from "node:fs";
import path from "path";
import { makeColumnIndexLocaleMap } from "./makeColumnIndexLocaleMap";
import { makeI18nMessagesMap } from "./makeI18nMessagesMap";

export function genLocales(inputPath: string, outputPath: string) {
  const worksheets = xlsx.parse(path.resolve(inputPath));
  const worksheet = worksheets[0];
  const [header, ...data] = worksheet.data;

  const columnIndexLocaleMap = makeColumnIndexLocaleMap(header);
  const i18nMessagesMap = makeI18nMessagesMap(data, columnIndexLocaleMap);

  fs.mkdirSync(path.resolve(outputPath), { recursive: true });

  Object.keys(i18nMessagesMap).forEach((locale) => {
    const localeFilePath = path.resolve(outputPath, `${locale}.json`);
    console.log(`Writing to ${localeFilePath}`);
    fs.writeFileSync(
      localeFilePath,
      JSON.stringify(i18nMessagesMap[locale], null, 2)
    );
  });
}

genLocales("./i18n-messages.xlsx", "./locales");
