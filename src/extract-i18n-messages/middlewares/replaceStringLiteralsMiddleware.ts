import { defineMiddleware } from "../defineMiddleware";
import { I18nMessages } from "../typings";
import { getNodePaths } from "../utils/getNodePaths";
import { isComponentFunction } from "../utils/isComponentFunction";

export const replaceStringLiteralsMiddleware = defineMiddleware(
  (source, previousValues, { j }) => {
    const root = j(source);
    const values: I18nMessages = { ...previousValues };

    root.find(j.Literal).replaceWith((path) => {
      const { value } = path.node;

      if (typeof value === "string") {
        const paths = getNodePaths(path);
        // find the closest ObjectProperty

        if (paths.length > 1 && paths[0] && isComponentFunction(paths[0])) {
          const key = paths.map((n) => n.name).join(".");
          values[key] = value;
          return j.callExpression(j.identifier("t"), [j.stringLiteral(key)]);
        }
      }
      return path.value;
    });

    return [root.toSource(), values];
  }
);
