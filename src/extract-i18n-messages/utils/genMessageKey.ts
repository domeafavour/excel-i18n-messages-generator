import { NodePath } from "../typings";

export function genMessageKey<T extends NodePath>(paths: T[]) {
  return paths.map((p) => p.name).join(".");
}
