import { defineMiddleware } from "../defineMiddleware";

export const addHookImportMiddleware = defineMiddleware(
  (source, values, { j }) => {
    const root = j(source);

    const hooksImport = j.importDeclaration(
      [j.importSpecifier(j.identifier("useTranslation"))],
      j.literal("react-i18next")
    );

    const hooksImportExists = root.find(j.ImportDeclaration, {
      source: { value: "react-i18next" },
    }).length;

    if (!hooksImportExists) {
      root.find(j.Program).get("body", 0).insertBefore(hooksImport);
    }

    return [root.toSource(), values];
  }
);
