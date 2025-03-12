import { JSCodeshift } from "jscodeshift";

export type I18nMessages = Record<string, string>;

export interface MiddlewareContext {
  j: JSCodeshift;
}

export type ExtractMiddleware = (
  source: string,
  messages: I18nMessages,
  context: MiddlewareContext
) => [code: string, values: I18nMessages];

export type NodePath = {
  type: string;
  name: string;
};
