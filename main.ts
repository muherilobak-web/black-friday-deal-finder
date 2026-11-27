// Friday Verdict — entry point.
// This little program gathers the finished site (the app/ folder and the
// screenshots/ folder beside it), lays them out in the output folder, and
// asks make.fun's own dossier builder to pack that folder into the
// dossier.json the judges read. Nothing here fetches anything from the
// internet; the only work is copying files and calling the vendored builder.

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { buildDossier } from "./vendor/makefun-frontend.ts";

// The scorer's limits for this competition: at most 160 KiB of dossier
// text, at most 4 screenshots of at most 256 KiB each, and an app of at
// most 993 files and directories totalling at most 16 MiB.
const CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_bytes: 16777216,
  app_max_files: 993
};

const root = resolve(import.meta.dirname);
const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR || join(root, "output"));

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

for (const folder of ["app", "screenshots"]) {
  const source = join(root, folder);
  if (existsSync(source)) {
    cpSync(source, join(outputDir, folder), { recursive: true });
  }
}

const dossier = await buildDossier(outputDir, CAPS);
writeFileSync(join(outputDir, "dossier.json"), Buffer.from(dossier));
console.log("dossier.json written: " + Buffer.from(dossier).length + " bytes in " + outputDir);
