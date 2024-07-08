import xlsx from "node-xlsx";
import fs from "node:fs";
import path from "path";
import { buildExcelData } from "./buildExcelData";
import { flattenObject } from "./flattenObject";

const defaultLocale = "zh-CN";

export function genExcel(inputPath: string, outputPath: string) {
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

genExcel("./locales", "./locales.xlsx");
