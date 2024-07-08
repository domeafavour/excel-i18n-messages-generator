import xlsx from "node-xlsx";
import fs from "node:fs";
import path from "path";
import { buildExcelData } from "./buildExcelData";
import { flattenObject } from "./flattenObject";
import { Command } from "commander";

export function genExcel(
  inputPath: string,
  outputPath: string,
  defaultLocale = "zh-CN"
) {
  const messages: Record<string, Record<string, string>> = {};

  const localesDir = fs.readdirSync(path.resolve(inputPath));
  localesDir.forEach((fileName) => {
    if (path.extname(fileName) !== ".json") {
      return;
    }

    const content = fs.readFileSync(path.resolve(inputPath, fileName));
    const json = JSON.parse(content.toString());
    const baseName = path.basename(fileName, ".json");
    messages[baseName] = flattenObject(json);
  });

  const excelData = buildExcelData(messages, defaultLocale);
  const buffer = xlsx.build([
    { name: "sheet 1", data: excelData, options: {} },
  ]);
  fs.writeFileSync(path.resolve(outputPath), buffer);
}

const program = new Command();

program
  .name("gen excel")
  .description("Generate an excel from locale json files")
  .description("input file path")
  .argument("<inputPath>")
  .description("output file path")
  .argument("<outputPath>")
  .option("-d, --default-locale", "Default locale")
  .action((inputPath: string, outputPath: string) => {
    genExcel(inputPath, outputPath);
  });

program.parse(process.argv);
