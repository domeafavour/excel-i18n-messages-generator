import { Command } from "commander";
import { build } from "node-xlsx";
import { writeFileSync } from "node:fs";
import { diffObjects } from "./utils/diffObjects";
import { readJSON } from "./utils/readJSON";

const program = new Command();

program
  .name("diff locale json")
  .argument("<sourcePath>")
  .argument("<targetPath>")
  .argument("[outputPath]")
  .description("Diff two locale files and output the diff and excel file")
  // TODO: output path should be an option
  .action((sourcePath: string, targetPath: string, outputPath) => {
    const diff = diffObjects(readJSON(sourcePath), readJSON(targetPath));

    const buffer = build([
      {
        name: "新增",
        data: [
          ["ID", "Value"],
          ...diff.ADDED.map((item) => [item.key, item.value]),
        ],
        options: {},
      },
      {
        name: "删除",
        data: [
          ["ID", "Value"],
          ...diff.REMOVED.map((item) => [item.key, item.value]),
        ],
        options: {},
      },
      {
        name: "修改",
        data: [
          ["ID", "Value", "Before"],
          ...diff.UPDATED.map((item) => [
            item.key,
            item.newValue,
            item.oldValue,
          ]),
        ],
        options: {},
      },
    ]);

    // @ts-ignore
    writeFileSync(outputPath || "diff.xlsx", buffer);
  });

program.parse(process.argv);
