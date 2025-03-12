import { ASTPath } from "jscodeshift";
import { getNodePaths } from "./getNodePaths";

export function genMessageKey<T extends ASTPath<any>>(p: T) {
  return getNodePaths(p)
    .map((p) => p.name)
    .join(".");
}
