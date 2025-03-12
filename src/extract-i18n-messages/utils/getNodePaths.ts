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
      paths.unshift({ type: "ArrayItem", name: index.toString() });
    }

    if (pa.value.type === "JSXAttribute") {
      paths.unshift({ type: "JSXAttribute", name: pa.value.name.name });
    }

    // console.log("pa.value.type", pa.value.type);
    // console.log("===");

    if (pa.value.type === "CallExpression") {
      paths.unshift({ type: "CallExpression", name: pa.value.callee.name });
    }

    if (pa.value.type === "JSXElement") {
      paths.unshift({
        type: "JSXElement",
        name: pa.value.openingElement.name.name,
      });
    }

    if (pa.value.id) {
      paths.unshift({ type: pa.value.type, name: pa.value.id.name });
    }
    pa = pa.parent;
  }
  return paths;
}
