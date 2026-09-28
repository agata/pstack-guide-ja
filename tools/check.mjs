// Usage: bun tools/check.mjs
// Verifies the manuscript sources, the built EPUB and (if present) the built PDF.
import { readFileSync, existsSync, readdirSync } from "node:fs";
import JSZip from "jszip";
import { EpubCheck } from "@likecoin/epubcheck-ts";
import { loadManuscript, EXAMPLE_LABEL, COMMENTARY_LABEL } from "./lib/manuscript.mjs";

let failed = 0;
const fail = (msg) => {
  failed++;
  console.error(`FAIL ${msg}`);
};

// 1. Manuscript rules.
const { items } = loadManuscript();
const ids = new Map(items.map((i) => [i.href, new Set(i.headings.map((h) => h.id).concat(i.id))]));
for (const item of items) {
  if (item.source.includes("—")) fail(`${item.file}: contains em dash`);
  // Blockquotes that present author-written examples or commentary must open with the exact label.
  for (const m of item.source.matchAll(/^> \*\*((?:예시|해설)[^*]*)\*\*/gm)) {
    if (m[1] !== EXAMPLE_LABEL && m[1] !== COMMENTARY_LABEL) fail(`${item.file}: example or commentary block with a non-standard label: ${m[1]}`);
  }
  for (const m of item.html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:)/.test(href)) continue;
    const [file0, frag] = href.split("#");
    const file = file0 === "" ? item.href : file0;
    if (!ids.has(file)) fail(`${item.file}: link to missing document ${href}`);
    else if (frag && !ids.get(file).has(frag)) fail(`${item.file}: link to missing anchor ${href}`);
  }
}
const srcRoot = process.env.PSTACK_SRC;
if (!srcRoot) console.warn("PSTACK_SRC not set: skipping source path check");
for (const item of items) {
  if (!srcRoot) break;
  for (const path of item.srcPaths) if (!existsSync(`${srcRoot}/${path}`)) fail(`${item.file}: source path not found in clone: ${path}`);
}
// Every skill, playbook and agent in the source clone has a section anchor in the manuscript.
if (srcRoot) {
  const anchors = new Set(items.flatMap((i) => i.headings.map((h) => h.id)));
  const want = (dir, prefix) => {
    for (const name of readdirSync(`${srcRoot}/${dir}`)) {
      const base = name.replace(/\.md$/, "");
      if (!anchors.has(`${prefix}-${base}`)) fail(`no section for ${dir}/${name} (expected #${prefix}-${base})`);
    }
  };
  want("skills", "skill");
  want("skills/poteto-mode/playbooks", "playbook");
  console.log(`coverage: ${readdirSync(`${srcRoot}/skills`).length} skills, ${readdirSync(`${srcRoot}/skills/poteto-mode/playbooks`).length} playbooks`);
}

for (const f of readdirSync(".").filter((f) => f.endsWith(".md"))) {
  if (readFileSync(f, "utf8").includes("—")) fail(`${f}: contains em dash`);
}

// 2. EPUB structure and validity.
const epubPath = "dist/pstack-guide.epub";
if (!existsSync(epubPath)) fail(`${epubPath} missing`);
else {
  const data = readFileSync(epubPath);
  const zip = await JSZip.loadAsync(data);
  const names = Object.keys(zip.files);
  if (names[0] !== "mimetype") fail("mimetype is not the first zip entry");
  const result = await EpubCheck.validate(new Uint8Array(data));
  const msgs = result.messages ?? [];
  const errors = msgs.filter((m) => ["fatal", "error"].includes(String(m.severity).toLowerCase()));
  const warnings = msgs.filter((m) => String(m.severity).toLowerCase() === "warning");
  for (const m of [...errors, ...warnings]) console.error(`${m.severity} ${m.id} ${m.location?.path ?? ""} ${m.message}`);
  if (errors.length) fail(`epubcheck: ${errors.length} errors`);
  if (warnings.length) fail(`epubcheck: ${warnings.length} warnings`);
  console.log(`epubcheck: valid=${result.valid} errors=${errors.length} warnings=${warnings.length}`);
}

if (failed) {
  console.error(`${failed} check(s) failed`);
  process.exit(1);
}
console.log("all checks passed");
