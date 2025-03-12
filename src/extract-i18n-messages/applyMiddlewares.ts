import api from "jscodeshift";
import { ExtractMiddleware, I18nMessages } from "./typings";

export function applyMiddlewares(
  source: string,
  middlewares: ExtractMiddleware[]
) {
  return middlewares.reduce((acc, middleware) => middleware(...acc, api), [
    source,
    {} as I18nMessages,
  ] as const);
}
