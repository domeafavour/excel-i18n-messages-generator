import { defineMiddleware } from "../defineMiddleware";
import { I18nMessages } from "../typings";
import { genMessageKey } from "../utils/genMessageKey";
import { getNodePaths } from "../utils/getNodePaths";
import { isComponentFunction } from "../utils/isComponentFunction";
import { isHtmlTagNodePath } from "../utils/isHtmlTagNodePath";

export const replaceStringLiteralsMiddleware = defineMiddleware(
  (source, previousValues, { j }) => {
    const root = j(source);
    const values: I18nMessages = { ...previousValues };

    root.find(j.Literal).replaceWith((path) => {
      const { value } = path.node;

      if (typeof value === "string") {
        const paths = getNodePaths(path).filter((p) => !isHtmlTagNodePath(p));

        // string variable declaration in a component
        if (paths.length === 2 && paths[0] && isComponentFunction(paths[0])) {
          const key = genMessageKey(paths);
          values[key] = value;
          return j.callExpression(j.identifier("t"), [j.stringLiteral(key)]);
        }
      }
      return path.value;
    });

    return [root.toSource(), values];
  }
);
