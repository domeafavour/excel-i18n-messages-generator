import { ASTPath } from "jscodeshift";
import { NodePath } from "../typings";

export function getNodePaths<T extends ASTPath<any>>(_p: T) {
  let paths: NodePath[] = [];

  let current = _p;
  let parent = current.parent;
  while (parent) {
    // if pa is a `Property`, we need to get the key name
    if (parent.value.type === "Property") {
      paths.unshift({
        type: parent.value.key.type,
        name: parent.value.key.name,
      });
    }

    // if pa is an `ArrayExpression`, we need to get the index
    if (parent.value.type === "ArrayExpression") {
      const index = parent.value.elements.indexOf(current.value);
      paths.unshift({ type: "ArrayItem", name: index.toString() });
    }

    if (parent.value.type === "JSXAttribute") {
      paths.unshift({ type: "JSXAttribute", name: parent.value.name.name });
    }

    // console.log("pa.value.type", pa.value.type);
    // console.log("===");

    if (parent.value.type === "CallExpression") {
      paths.unshift({ type: "CallExpression", name: parent.value.callee.name });
    }

    if (parent.value.type === "JSXElement") {
      paths.unshift({
        type: "JSXElement",
        // TOD: append \${props.key} to the name if `key` is on the JSXElement
        name: parent.value.openingElement.name.name,
      });
    }

    if (parent.value.id) {
      paths.unshift({ type: parent.value.type, name: parent.value.id.name });
    }
    current = parent;
    parent = parent.parent;
  }
  return paths;
}
