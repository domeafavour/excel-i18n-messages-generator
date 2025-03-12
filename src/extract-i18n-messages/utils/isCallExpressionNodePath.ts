import { NodePath } from "../typings";

export function isCallExpressionNodePath(p: NodePath) {
  return p.type === "CallExpression";
}
