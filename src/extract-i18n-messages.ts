import { Command } from "commander";
import { applyMiddlewares } from "./extract-i18n-messages/applyMiddlewares";
import { addHookImportMiddleware } from "./extract-i18n-messages/middlewares/addHookImportMiddleware";
import { replaceStringLiteralsMiddleware } from "./extract-i18n-messages/middlewares/replaceStringLiteralsMiddleware";

const code = `
export function Component() {
  const hello = "hello";
  const world = "world";

  return <span>{hello}{world}</span>;
}
`;

function extractI18nMessages(inputPath: string) {
  const [newSourceCode, values] = applyMiddlewares(code, [
    replaceStringLiteralsMiddleware,
    addHookImportMiddleware,
  ]);

  // output the modified code
  console.log(newSourceCode);
  console.log(values);
}

const program = new Command();

program
  .name("gen locales")
  .description("extract i18n messages from source code")
  .description("input file path")
  .argument("<inputPath>")
  // .description("output file path")
  // .argument("<outputPath>")
  // .option("-f, --flatten", "Flatten the object to a single level")
  .action(
    (inputPath: string, outputPath: string, options: { flatten?: boolean }) => {
      extractI18nMessages(inputPath);
    }
  );

program.parse(process.argv);
