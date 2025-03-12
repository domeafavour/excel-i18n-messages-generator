import { JSCodeshift } from "jscodeshift";

export type I18nMessages = Record<string, string>;

export type ExtractMiddleware = (
  source: string,
  messages: I18nMessages,
  api: JSCodeshift
) => [code: string, values: I18nMessages];

export type NodePath = {
  type: string;
  name: string;
};
