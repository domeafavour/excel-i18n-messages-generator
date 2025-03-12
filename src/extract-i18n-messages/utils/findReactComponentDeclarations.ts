import { Collection, FunctionDeclaration, JSCodeshift } from "jscodeshift";

export function findReactComponentDeclarations<
  T extends Collection<FunctionDeclaration>,
>(r: T, j: JSCodeshift) {
  return r.find(j.FunctionDeclaration, {
    id: {
      name: (value) => /^[A-Z]/.test(value),
    },
  });
}
