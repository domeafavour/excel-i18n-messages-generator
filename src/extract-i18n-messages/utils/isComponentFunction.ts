import { NodePath } from "../typings";

export function isComponentFunction(path: NodePath) {
  return (
    path.type === "FunctionDeclaration" &&
    path.name[0] === path.name[0].toUpperCase()
  );
}
