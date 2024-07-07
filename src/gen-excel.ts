import xlsx from "node-xlsx";
import fs from "node:fs";
import process from "node:process";
import path from "path";
import { buildExcelData } from "./buildExcelData";
import { flattenObject } from "./flattenObject";

const defaultLocale = "zh-CN";

export function genExcel() {
  const messages: Record<string, Record<string, string>> = {};

  const localesDir = fs.readdirSync(path.resolve(process.cwd(), "locales"));
  localesDir.forEach((fileName) => {
    const content = fs.readFileSync(
      path.resolve(process.cwd(), "locales", fileName)
    );
    const json = JSON.parse(content.toString());
    const baseName = path.basename(fileName, ".json");
    messages[baseName] = flattenObject(json);
  });

  const excelData = buildExcelData(messages, defaultLocale);
  const buffer = xlsx.build([
    { name: "sheet 1", data: excelData, options: {} },
  ]);
  fs.writeFileSync(path.resolve(process.cwd(), "locales.xlsx"), buffer);
}

genExcel();
