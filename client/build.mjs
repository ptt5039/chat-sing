// Client bundle for the web artifact.
//
// Bundling is owned by the SDK so every artifact produces the canonical
// production bundle. The second pass only lowers modern JavaScript syntax in
// that bundle for iPad Safari versions that support modules but cannot parse
// private class fields or optional chaining used by current dependencies.

import { buildClient } from "@hatch/space-sdk/build";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import ts from "typescript";

await buildClient();

const outputDirectory = "./client/dist/assets";
for (const fileName of await readdir(outputDirectory)) {
  if (!fileName.endsWith(".js")) continue;
  const path = join(outputDirectory, fileName);
  const source = await readFile(path, "utf8");
  const result = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2015,
      module: ts.ModuleKind.ESNext,
      removeComments: true,
    },
    fileName,
    reportDiagnostics: true,
  });
  const errors = (result.diagnostics ?? []).filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
  if (errors.length > 0) {
    throw new Error(`Safari compatibility pass failed for ${fileName}: ${errors.map((diagnostic) => diagnostic.messageText).join("; ")}`);
  }
  await writeFile(path, result.outputText, "utf8");
}
