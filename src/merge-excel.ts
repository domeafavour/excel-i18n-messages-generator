import { Command } from "commander";
import { globSync } from "fast-glob";
import { statSync } from "fs";
import path, { basename, extname } from "path";
import { createWorksheetI18nMap } from "./utils/createWorksheetI18nMap";
import { loadExcel } from "./utils/loadExcel";
import { mergeLocales } from "./utils/mergeLocales";
import { readJSON } from "./utils/readJSON";
import { writeJSON } from "./utils/writeJSON";

function mergeExcel(
  worksheets: ReturnType<typeof loadExcel>,
  locales: Record<string, Record<string, any>>,
  flatten = false
) {
  return mergeLocales(locales, createWorksheetI18nMap(worksheets[0], flatten));
}

const program = new Command();
program
  .name("merge-excel")
  .description("Merge excel into locale json files")
  .argument("<localesDir>")
  .argument("<excelPath>")
  .action((localesDir: string, excelFile: string) => {
    const resolvedLocalesDir = path.resolve(localesDir);
    const locales: Record<string, Record<string, any>> = {};
    const stat = statSync(resolvedLocalesDir);
    const destDir = stat.isDirectory()
      ? resolvedLocalesDir
      : path.dirname(resolvedLocalesDir);
    let isFile = false;

    if (stat.isFile()) {
      const ext = extname(resolvedLocalesDir);
      if (ext !== ".json") {
        throw new Error("Invalid file extension");
      }
      isFile = true;
      locales[basename(resolvedLocalesDir, ext)] = readJSON(localesDir);
    } else {
      globSync([localesDir + "/*.json"]).forEach((fileName) => {
        const locale = basename(fileName, ".json");
        locales[locale] = readJSON(fileName);
      });
    }

    const merged = mergeExcel(loadExcel(excelFile), locales);

    if (isFile) {
      console.log(`Writing to ${resolvedLocalesDir}`);
      writeJSON(resolvedLocalesDir, merged[Object.keys(merged)[0]]);
      console.log("SUCCESS");
      return;
    }

    Object.keys(merged).forEach((locale) => {
      const localeFilePath = path.resolve(destDir, `${locale}.json`);
      console.log(`Writing to ${localeFilePath}`);
      writeJSON(localeFilePath, merged[locale]);
    });

    console.log("SUCCESS");
  });

program.parse(process.argv);
