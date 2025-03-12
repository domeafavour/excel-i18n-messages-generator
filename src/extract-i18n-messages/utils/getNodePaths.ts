import { ASTPath } from "jscodeshift";
import { NodePath } from "../typings";

export function getNodePaths<T extends ASTPath<any>>(p: T) {
  let paths: NodePath[] = [];

  let pa = p.parent;
  while (pa) {
    // if pa is a `Property`, we need to get the key name
    if (pa.value.type === "Property") {
      paths.unshift({ type: pa.value.key.type, name: pa.value.key.name });
    }

    // if pa is an `ArrayExpression`, we need to get the index
    if (pa.value.type === "ArrayExpression") {
      const index = pa.value.elements.indexOf(p.value);
      paths.unshift({ type: pa.value.type, name: index.toString() });
    }

    if (pa.value.id) {
      paths.unshift({ type: pa.value.type, name: pa.value.id.name });
    }
    pa = pa.parent;
  }
  return paths;
}
