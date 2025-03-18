import xlsx from "node-xlsx";
import path from "path";

export function loadExcel(p: string) {
  return xlsx.parse(path.resolve(p));
}
