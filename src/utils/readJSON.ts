import { readJSONSync } from "fs-extra";
import path from "path";

export function readJSON(p: string) {
  return readJSONSync(path.resolve(p), "utf8");
}
