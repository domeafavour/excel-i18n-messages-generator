import { NodePath } from "../typings";

export function isHtmlTagNodePath(p: NodePath) {
  return p.type === "JSXElement" && /^[a-z]/.test(p.name);
}
