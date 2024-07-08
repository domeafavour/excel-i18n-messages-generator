import { Command } from "commander";
import xlsx from "node-xlsx";
import fs from "node:fs";
import path from "path";
import { makeColumnIndexLocaleMap } from "./makeColumnIndexLocaleMap";
import { makeI18nMessagesMap } from "./makeI18nMessagesMap";

export function genLocales(
  inputPath: string,
  outputPath: string,
  flatten = false
) {
  const worksheets = xlsx.parse(path.resolve(inputPath));
  const worksheet = worksheets[0];
  const [header, ...data] = worksheet.data;

  const columnIndexLocaleMap = makeColumnIndexLocaleMap(header);
  const i18nMessagesMap = makeI18nMessagesMap(
    data,
    columnIndexLocaleMap,
    flatten
  );

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

const program = new Command();

program
  .name("gen locales")
  .description("Generate locales from an excel file")
  .description("input file path")
  .argument("<inputPath>")
  .description("output file path")
  .argument("<outputPath>")
  .option("-f, --flatten", "Flatten the object to a single level")
  .action(
    (inputPath: string, outputPath: string, options: { flatten?: boolean }) => {
      genLocales(inputPath, outputPath, options.flatten);
    }
  );

program.parse(process.argv);
