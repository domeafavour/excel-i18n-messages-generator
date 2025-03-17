import { Command } from "commander";
import { readJSON } from "./utils/readJSON";
import { writeJSON } from "./utils/writeJSON";
import { mergeLocales } from "./utils/mergeLocales";

const program = new Command();
program
  .name("merge-locales")
  .description("Merge locale json files")
  .argument("<sourcePath>")
  .argument("<updatesPath>")
  .argument("[outputPath]")
  .action((sourcePath: string, updatesPath: string, outputPath: string) => {
    const newLocale = mergeLocales(readJSON(sourcePath), readJSON(updatesPath));
    writeJSON(outputPath || sourcePath, newLocale);
    console.log("SUCCESS");
  });

program.parse(process.argv);
