import { defineMiddleware } from "../defineMiddleware";
import { findReactComponentDeclarations } from "../utils/findReactComponentDeclarations";
import { genMessageKey } from "../utils/genMessageKey";
import { getNodePaths } from "../utils/getNodePaths";

export const antdMessageMiddleware = defineMiddleware(
  (source, messages, { j }) => {
    const values = { ...messages };
    const root = j(source);

    findReactComponentDeclarations(root, j).forEach((path) => {
      j(path)
        .find(j.CallExpression, {
          callee: {
            type: "MemberExpression",
            object: { name: "message" },
            // property: { name: "error" },
          },
        })
        .forEach((path) => {
          const message = path.node.arguments[0];
          if (message.type === "Literal") {
            const messageKey = genMessageKey(getNodePaths(path));
            values[messageKey] = message.value as string;
            path.node.arguments[0] = j.callExpression(j.identifier("t"), [
              j.stringLiteral(messageKey),
            ]);
          }
        });
    });
    return [root.toSource(), values];
  }
);
