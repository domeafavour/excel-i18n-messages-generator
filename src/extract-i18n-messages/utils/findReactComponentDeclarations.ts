import j, { Collection, FunctionDeclaration } from "jscodeshift";

export function findReactComponentDeclarations<
  T extends Collection<FunctionDeclaration>,
>(r: T) {
  return r.find(j.FunctionDeclaration, {
    id: {
      name: (value) => /^[A-Z]/.test(value),
    },
  });
}
