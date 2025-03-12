import { defineMiddleware } from "../defineMiddleware";

export const addHookImportMiddleware = defineMiddleware(
  (source, values, api) => {
    const j = api(source);

    const hooksImport = api.importDeclaration(
      [api.importSpecifier(api.identifier("useTranslation"))],
      api.literal("react-i18next")
    );

    const hooksImportExists = j.find(api.ImportDeclaration, {
      source: { value: "react-i18next" },
    }).length;

    if (!hooksImportExists) {
      j.find(api.Program).get("body", 0).insertBefore(hooksImport);
    }

    return [j.toSource(), values];
  }
);
