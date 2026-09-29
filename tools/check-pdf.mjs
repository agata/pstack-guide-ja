import { readFileSync, existsSync } from 'node:fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import MarkdownIt from 'markdown-it';
import { loadManuscript, bookFile } from './lib/manuscript.mjs';

const path = `dist/${bookFile('pdf')}`;
if (!existsSync(path)) throw new Error(`missing ${path}`);
const doc = await getDocument({data: new Uint8Array(readFileSync(path)), useSystemFonts: false}).promise;
const normalize = s => s.normalize('NFKC').replace(/\s+/gu, '');
let body = '', full = '';
for (let n = 1; n <= doc.numPages; n++) {
  const page = await doc.getPage(n);
  const content = await page.getTextContent();
  const height = page.getViewport({scale: 1}).height;
  for (const item of content.items) {
    if (!item.str) continue;
    full += item.str;
    if (item.transform[5] > 40 && item.transform[5] < height - 40) body += item.str;
  }
}
let failed = 0;
const fail = msg => { console.error(`FAIL ${msg}`); failed++; };
if (/\p{Script=Hangul}/u.test(full)) fail('Korean text remains');
if (/\uFFFD/.test(full)) fail('replacement characters found');
const japanese = (full.match(/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/gu) ?? []).length;
if (japanese < 15000) fail(`unexpectedly little Japanese text: ${japanese}`);
const normalized = normalize(body);
const allText = normalize(full);
const md = new MarkdownIt();
let passages = 0;
for (const item of loadManuscript().items) {
  if (!allText.includes(normalize(item.title))) fail(`missing title: ${item.file}`);
  for (const token of md.parse(item.source, {})) {
    if (token.type !== 'inline') continue;
    for (const child of token.children ?? []) {
      if (child.type !== 'text') continue;
      const value = normalize(child.content.replace(/\{#[\w-]+\}/g, ''));
      if (value.length < 24 || !/[\p{Script=Hiragana}\p{Script=Katakana}]/u.test(value)) continue;
      for (let at = 0; at < value.length; at += 24) {
        const snippet = value.slice(at, at + 24);
        if (snippet.length < 8) continue;
        passages++;
        if (!normalized.includes(snippet)) fail(`${item.file}: missing text: ${snippet}`);
      }
    }
  }
}
const outline = await doc.getOutline();
if (!outline?.length) fail('missing PDF outline');
console.log(`PDF: ${doc.numPages} pages, ${japanese} Japanese characters, ${passages} manuscript text fragments checked`);
if (failed) process.exit(1);
console.log('PDF text checks passed');
