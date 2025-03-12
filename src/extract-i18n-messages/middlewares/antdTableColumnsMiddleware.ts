import { defineMiddleware } from "../defineMiddleware";
import { findAntdTableColumnsDeclarations } from "../utils/findAntdTableColumnsDeclarations";
import { findReactComponentDeclarations } from "../utils/findReactComponentDeclarations";
import { genMessageKey } from "../utils/genMessageKey";
import { getNodePaths } from "../utils/getNodePaths";
import { isCallExpressionNodePath } from "../utils/isCallExpressionNodePath";

export const antdTableColumnsMiddleware = defineMiddleware(
  (source, messages, { j }) => {
    const values = { ...messages };
    const root = j(source);

    findReactComponentDeclarations(root, j).forEach((path) => {
      findAntdTableColumnsDeclarations(path, j).forEach((columnsPath) => {
        j(columnsPath)
          .find(j.ObjectExpression)
          .forEach((objectExpressionPath) => {
            j(objectExpressionPath)
              .find(j.Literal)
              .replaceWith((literalPath) => {
                const { value } = literalPath.node;
                if (typeof value === "string") {
                  const messageKey = genMessageKey(
                    getNodePaths(literalPath).filter(
                      (p) => !isCallExpressionNodePath(p)
                    )
                  );
                  if (messageKey.endsWith(".title")) {
                    const keyOrDataIndexProp = j(literalPath)
                      .closest(j.ObjectExpression)
                      .nodes()[0]
                      ?.properties.find((prop) => {
                        return (
                          prop.type === "Property" &&
                          ((prop.key as any).name === "key" ||
                            (prop.key as any).name === "dataIndex")
                        );
                      });
                    const resolvedKey = messageKey.replace(
                      /\.\d+(?=\.title)/,
                      "." + (keyOrDataIndexProp as any).value.value
                    );
                    values[resolvedKey] = value;
                    return j.callExpression(j.identifier("t"), [
                      j.stringLiteral(resolvedKey),
                    ]);
                  }
                  return j.stringLiteral(value);
                }
                return literalPath;
              });
          });
      });
    });
    return [root.toSource(), values];
  }
);
