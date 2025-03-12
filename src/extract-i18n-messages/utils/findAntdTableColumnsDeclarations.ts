import { ArrayExpression, ASTPath, Collection, JSCodeshift } from "jscodeshift";

export function findAntdTableColumnsDeclarations<T extends ASTPath<any>>(
  p: T,
  j: JSCodeshift
): Collection<ArrayExpression> {
  return j(p).find(j.ArrayExpression, {
    elements: [
      {
        type: "ObjectExpression",
        properties: [
          {
            key: {
              name: "key",
            },
          },
          {
            key: {
              name: "dataIndex",
            },
          },
          {
            key: {
              name: "title",
            },
          },
        ],
      },
    ],
  });
}
