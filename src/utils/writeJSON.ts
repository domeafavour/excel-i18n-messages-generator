import { writeJSONSync } from "fs-extra";
import path from "path";

export function writeJSON(p: string, obj: any) {
  return writeJSONSync(path.resolve(p), obj, { spaces: 2 });
}
