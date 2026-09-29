// Usage: bun tools/check.mjs
// Verifies the manuscript sources, the built EPUB and (if present) the built PDF.
import { readFileSync, existsSync, readdirSync } from "node:fs";
import JSZip from "jszip";
import { EpubCheck } from "@likecoin/epubcheck-ts";
import { loadManuscript, bookFile, BOOK_VERSION, BOOK, SOURCE, EXAMPLE_LABEL, COMMENTARY_LABEL } from "./lib/manuscript.mjs";

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
  for (const m of item.source.matchAll(/^> \*\*((?:例|解説)[^*]*)\*\*/gm)) {
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
  want("agents", "agent");
  want("skills/poteto-mode/playbooks", "playbook");
  console.log(`coverage: ${readdirSync(`${srcRoot}/skills`).length} skills, ${readdirSync(`${srcRoot}/skills/poteto-mode/playbooks`).length} playbooks`);
}

for (const f of readdirSync(".").filter((f) => f.endsWith(".md"))) {
  if (readFileSync(f, "utf8").includes("—")) fail(`${f}: contains em dash`);
}

// 2. Japanese edition completeness and source correspondence.
if (BOOK.language !== "ja") fail("book language must be ja");
const expectedKinds = { front: 2, part: 9, ch: 22, app: 4 };
for (const [kind, count] of Object.entries(expectedKinds)) {
  if (items.filter(i => i.kind === kind).length !== count) fail(`expected ${count} ${kind} documents`);
}
for (const item of items) {
  if (/[\p{Script=Hangul}]/u.test(item.source)) fail(`${item.file}: untranslated Korean text`);
  if (/\{\{/.test(item.source)) fail(`${item.file}: unexpanded placeholder`);
  if (item.kind !== "part" && !/[\p{Script=Hiragana}\p{Script=Katakana}]/u.test(item.source)) fail(`${item.file}: missing Japanese text`);
  for (const h of item.headings.filter(h => /^(skill|playbook|agent)-/.test(h.id))) {
    const match = h.id.match(/^(skill|playbook|agent)-(.*)$/);
    const path = match[1] === "skill" ? `skills/${match[2]}/SKILL.md` : match[1] === "playbook" ? `skills/poteto-mode/playbooks/${match[2]}.md` : `agents/${match[2]}.md`;
    if (!item.srcPaths.includes(path)) fail(`${item.file}: missing source for ${h.id}`);
  }
}
const anchors = items.flatMap(i => i.headings.map(h => h.id));
for (const [prefix, count] of [["skill-", 47], ["playbook-", 23], ["agent-", 2]]) {
  const found = anchors.filter(id => id.startsWith(prefix));
  if (found.length !== count || new Set(found).size !== count) fail(`expected ${count} distinct ${prefix} sections`);
}
console.log("Japanese edition: 37 documents, 47 skills, 23 playbooks, 2 agents");

// 3. Dark screen palette. Print and the PDF stay on the light rules: the dark
// block is scoped to screen, and every text or stroke color clears WCAG against its fill.
const styleCss = readFileSync("assets/style.css", "utf8");
const printCss = readFileSync("assets/print.css", "utf8");
if (/prefers-color-scheme/.test(printCss)) fail("print.css must stay light; it declares prefers-color-scheme");
const darkBlocks = [];
for (const m of styleCss.matchAll(/@media\s+([^{]+)\{/g)) {
  if (!/prefers-color-scheme:\s*dark/.test(m[1])) continue;
  let i = m.index + m[0].length;
  let depth = 1;
  while (i < styleCss.length && depth) {
    if (styleCss[i] === "{") depth++;
    else if (styleCss[i] === "}") depth--;
    i++;
  }
  darkBlocks.push({ prelude: m[1], body: styleCss.slice(m.index + m[0].length, i - 1) });
}
if (darkBlocks.length !== 1) fail(`style.css should have one dark palette, found ${darkBlocks.length}`);
else {
  const { prelude, body } = darkBlocks[0];
  if (!/\bscreen\b/.test(prelude)) fail("dark palette must be @media screen so print and PDF stay light");
  const channel = (c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const lum = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
  };
  const contrast = (a, b) => {
    const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
  };
  const vars = Object.fromEntries([...body.matchAll(/(--dm-[\w-]+)\s*:\s*(#[0-9a-fA-F]{6})\b/g)].map((v) => [v[1], v[2].toLowerCase()]));
  for (const name of Object.keys(vars)) if (!body.includes(`var(${name})`)) fail(`dark palette ${name} is never applied`);
  const pairs = [
    ["--dm-fg", "--dm-bg", 4.5],
    ["--dm-fg", "--dm-example-bg", 4.5],
    ["--dm-muted", "--dm-bg", 4.5],
    ["--dm-code-fg", "--dm-code-bg", 4.5],
    ["--dm-code-fg", "--dm-pre-bg", 4.5],
    ["--dm-code-fg", "--dm-th-bg", 4.5],
    ["--dm-link", "--dm-bg", 4.5],
    ["--dm-link", "--dm-code-bg", 4.5],
    ["--dm-link", "--dm-th-bg", 4.5],
    ["--dm-link-line", "--dm-bg", 3],
    ["--dm-quote-fg", "--dm-quote-bg", 4.5],
    ["--dm-quote-border", "--dm-quote-bg", 3],
    ["--dm-border", "--dm-bg", 3],
    ["--dm-flow-text", "--dm-flow-fill", 4.5],
    ["--dm-flow-text", "--dm-flow-end", 4.5],
    ["--dm-flow-text", "--dm-flow-alt", 4.5],
    ["--dm-flow-sub", "--dm-flow-fill", 4.5],
    ["--dm-flow-sub", "--dm-flow-end", 4.5],
    ["--dm-flow-sub", "--dm-flow-alt", 4.5],
    ["--dm-flow-stroke", "--dm-flow-fill", 3],
    ["--dm-flow-stroke-alt", "--dm-flow-alt", 3],
    ["--dm-hl-comment", "--dm-pre-bg", 4.5],
    ["--dm-hl-keyword", "--dm-pre-bg", 4.5],
    ["--dm-hl-string", "--dm-pre-bg", 4.5],
    ["--dm-hl-title", "--dm-pre-bg", 4.5],
  ];
  for (const [fg, bg, min] of pairs) {
    if (!vars[fg] || !vars[bg]) fail(`dark palette missing ${vars[fg] ? bg : fg}`);
    else {
      const ratio = contrast(vars[fg], vars[bg]);
      if (ratio < min) fail(`dark contrast ${fg} on ${bg} is ${ratio.toFixed(2)}:1, need ${min}:1`);
    }
  }
  console.log(`dark palette: ${Object.keys(vars).length} colors, ${pairs.length} contrast pairs`);
}

// 4. EPUB structure and validity.
// The book version is BOOK_VERSION. The colophon, EPUB metadata, output file names and README must all agree.
const version = BOOK_VERSION;
const colophon = items.find((i) => i.file === "01-front-colophon.md");
if (!colophon || !colophon.source.includes(`| 本書の版 | ${version} `)) fail(`colophon does not state book version ${version}`);
const readme = readFileSync("README.md", "utf8");
for (const ext of ["epub", "pdf"]) if (!readme.includes(bookFile(ext))) fail(`README.md does not name ${bookFile(ext)}`);
if (!readme.includes(`pstack ${SOURCE.version}`)) fail(`README.md does not state pstack version ${SOURCE.version}`);
if (!readme.includes(`現在の本書の版は \`${version}\``)) fail(`README.md does not state book version ${version}`);
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
  if (!opf.includes("<dc:language>ja</dc:language>")) fail("EPUB language is not ja");
  for (const name of names.filter(n => n.endsWith(".xhtml"))) {
    const xhtml = await zip.file(name).async("string");
    if (!xhtml.includes('xml:lang="ja" lang="ja"')) fail(`${name}: language is not ja`);
    if (/\p{Script=Hangul}/u.test(xhtml)) fail(`${name}: Korean text remains`);
  }
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
