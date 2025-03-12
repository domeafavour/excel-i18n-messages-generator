import { defineMiddleware } from "../defineMiddleware";
import { findReactComponentDeclarations } from "../utils/findReactComponentDeclarations";
import { genMessageKey } from "../utils/genMessageKey";
import { getNodePaths } from "../utils/getNodePaths";
import { isCallExpressionNodePath } from "../utils/isCallExpressionNodePath";
import { isHtmlTagNodePath } from "../utils/isHtmlTagNodePath";

export const jsonSchemaMiddleware = defineMiddleware(
  (source, messages, { j }) => {
    const values = { ...messages };
    const root = j(source);

    // find function declarations with pascal case names
    findReactComponentDeclarations(root).forEach((path) => {
      // find json schema object
      j(path)
        .find(j.ObjectExpression, {
          properties: [
            {
              key: {
                name: "type",
              },
              value: {
                value: "object",
              },
            },
            {
              key: {
                name: "properties",
              },
            },
          ],
        })
        .forEach((schemaPath) => {
          j(schemaPath)
            .find(j.Literal)
            .replaceWith((literalPath) => {
              const { value } = literalPath.node;
              if (typeof value === "string") {
                const messageKey = genMessageKey(
                  getNodePaths(literalPath).filter(
                    (p) => !isHtmlTagNodePath(p) && !isCallExpressionNodePath(p)
                  )
                );
                const shouldReplace =
                  /(\.title|\.description|\.placeholder(\.\d)?)$/.test(
                    messageKey
                  );
                if (shouldReplace) {
                  values[messageKey] = value;
                  return j.callExpression(j.identifier("t"), [
                    j.stringLiteral(messageKey),
                  ]);
                }
                return j.stringLiteral(value);
              }
              return literalPath;
            });
        });
    });

    return [root.toSource(), values];
  }
);
