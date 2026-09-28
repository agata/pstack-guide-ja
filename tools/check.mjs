// Usage: bun tools/check.mjs
// Verifies the manuscript sources, the built EPUB and (if present) the built PDF.
import { readFileSync, existsSync, readdirSync } from "node:fs";
import JSZip from "jszip";
import { EpubCheck } from "@likecoin/epubcheck-ts";
import { loadManuscript, bookFile, BOOK_VERSION, SOURCE, EXAMPLE_LABEL, COMMENTARY_LABEL } from "./lib/manuscript.mjs";

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

// 2. Notation: the glossary lists the Korean words that do not map one to one to the source.
// Each row pairs a Korean word with one English term and names the chapter that introduces the pair,
// and that chapter must contain the pair in the fixed form 한국어(영어).
const TERMS_HEADING = "일대일로 옮겨지지 않는 용어";
const glossary = items.find((i) => i.file === "92-app-glossary.md");
const termsSection = glossary?.source.split(/^## /m).find((s) => s.startsWith(TERMS_HEADING));
if (!termsSection) fail(`glossary has no "${TERMS_HEADING}" section`);
else {
  const rows = termsSection.split("\n").filter((l) => l.startsWith("| ")).slice(2).map((l) => l.split("|").slice(1, -1).map((c) => c.trim().replaceAll("`", "")));
  if (rows[0]?.[0] !== "원칙") fail("glossary terms table must start with 원칙");
  for (const [ko, en, slug] of rows) {
    const chapter = items.find((i) => i.slug === slug);
    if (!chapter) fail(`glossary terms table: unknown chapter "${slug}" for ${ko}(${en})`);
    else if (!chapter.source.includes(`${ko}(${en})`)) fail(`${chapter.file}: missing ${ko}(${en}), the glossary says this chapter introduces it`);
    for (const item of items) if (item.source.includes(`${ko} (${en})`)) fail(`${item.file}: write ${ko}(${en}) without a space`);
  }
  console.log(`notation: ${rows.length} Korean(English) pairs`);
}

// 3. EPUB structure and validity.
// The book version is BOOK_VERSION. The colophon, EPUB metadata, output file names and README must all agree.
const version = BOOK_VERSION;
const colophon = items.find((i) => i.file === "01-front-colophon.md");
if (!colophon || !colophon.source.includes(`| 이 책의 버전 | ${version} `)) fail(`colophon does not state book version ${version}`);
const readme = readFileSync("README.md", "utf8");
for (const ext of ["epub", "pdf"]) if (!readme.includes(bookFile(ext))) fail(`README.md does not name ${bookFile(ext)}`);
if (!readme.includes(`pstack ${SOURCE.version}(커밋`)) fail(`README.md does not state pstack version ${SOURCE.version}`);
if (!readme.includes(`이 책의 현재 버전은 \`${version}\``)) fail(`README.md does not state book version ${version}`);
if (existsSync("dist")) {
  const want = new Set([bookFile("epub"), bookFile("pdf")]);
  for (const f of readdirSync("dist").filter((f) => /^pstack-guide.*\.(epub|pdf)$/.test(f))) if (!want.has(f)) fail(`dist/${f}: file name does not match version ${version}`);
}

const epubPath = `dist/${bookFile("epub")}`;
if (!existsSync(epubPath)) fail(`${epubPath} missing`);
else {
  const data = readFileSync(epubPath);
  const zip = await JSZip.loadAsync(data);
  const names = Object.keys(zip.files);
  const opf = await zip.file("OEBPS/content.opf").async("string");
  if (opf.match(/<meta property="schema:version">([^<]*)</)?.[1] !== version) fail(`EPUB metadata version does not equal ${version}`);
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
